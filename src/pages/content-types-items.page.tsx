import React, { useEffect, useState } from 'react';
import { ContentTypeTableHeaders } from '../components/content-type-table/table-headers';
import { ContentTypeTableBody } from '../components/content-type-table/table-body';
import { useParams } from 'react-router-dom';
import { Table } from '../ui/table';
import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';
import { StrapiGetParams } from '../interfaces/strapi/strapi.interface';

interface Pagination<T = []> {
    index: number;
    size: number;
    count: number;
    total: number;
    data: T;
}

const initialPaginate: Pagination = {
    index: 0,
    size: 10,
    count: 0,
    total: 0,
    data: [],
};

const totalPages = (count: number, size: number) => {
    return Math.ceil(count / size);
};

const PREV = 'prev';
const NEXT = 'next';
type PaginationButtons = number | 'prev' | 'next';

const pageArr = (totalPages: number): PaginationButtons[] => {
    const pages: number[] = [...Array(totalPages).keys()];
    const buttons: PaginationButtons[] = [PREV, ...pages, NEXT];

    return buttons;
};

/* move to service */
const getContentSchema = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/content-types/${model}`;
    return await axios.get(url);
};

const getContentCount = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/${model}/count`;
    return await axios.get(url);
};

// prepend the parameters with '_'
const getParams = (params: StrapiGetParams) => {
    let prepend = {};

    for (const param in params) {
        prepend = { ...prepend, [`_${param}`]: params[param] };
    }

    return qs.stringify(prepend, { addQueryPrefix: true });
};

const getContentItems = async (model: string, params: StrapiGetParams = {}) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/${model}`;
    const encoded = getParams(params);

    return axios.get(`${url}${encoded}`);
};

export const ContentTypeItems = () => {
    const { contentType } = useParams<{ contentType: string }>();

    const [pagination, setPagination] = useState<Pagination>(initialPaginate);
    const [schema, setSchema] = useState<any>({});

    // get data on load
    useEffect(() => {
        const getContentTypesItems = async () => {
            const schema = await getContentSchema(contentType);
            setSchema(schema.data.data);

            const { data } = await getContentCount(contentType);
            const total = totalPages(data.count, pagination.size);

            const response = await getContentItems(contentType, {
                limit: pagination.size,
                start: pagination.index,
            });
            setPagination({ ...pagination, data: response.data, count: data.count, total });
        };
        getContentTypesItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentType]);

    const handlePrevious = () => {
        let index = pagination.index;
        if (index <= 0) {
            index = 0;
        }

        handlePagination(index);
    };

    const handleNext = () => {
        let index = pagination.index;
        const { total } = pagination;
        if (index >= pagination.total) {
            index = total;
        }

        handlePagination(index);
    };

    const handlePagination = async (index: number) => {
        const newIndex = index;
        const sort = 'id:ASC';
        const { size } = pagination;

        const { data } = await getContentItems(contentType, { limit: size, sort, start: +newIndex * size });
        setPagination({ ...pagination, data, index: newIndex as number });
    };

    const pageButtons = pageArr(totalPages(pagination.count, pagination.size));

    return (
        <div className="p-4">
            <h1 className="mb-1 leading-none text-color-900 text-4xl font-light capitalize">{contentType}</h1>
            <p className="mt-0 mb-4 text-gray-600">{pagination.count} entries found</p>
            <hr className="my-8 border-b-2 border-gray-200" />

            <Table className="border">
                <ContentTypeTableHeaders layouts={schema.layouts} metadatas={schema.metadatas} />
                <ContentTypeTableBody layouts={schema.layouts} items={pagination.data} />
            </Table>

            <ul className="pagination mt-2">
                {pageButtons.map((value, index) => {
                    if (value === PREV) {
                        return (
                            <li key={index} className="page-item">
                                <button className="page-link" onClick={() => handlePrevious()}>
                                    {value}
                                </button>
                            </li>
                        );
                    }

                    if (value === NEXT) {
                        return (
                            <li key={index} className="page-item">
                                <button className="page-link" onClick={() => handleNext()}>
                                    {value}
                                </button>
                            </li>
                        );
                    }

                    return (
                        <li key={index} className={`page-item ${pagination.index === value && 'active'}`}>
                            <button className="page-link" onClick={() => handlePagination(value)}>
                                {value + 1}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
