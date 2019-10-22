import React, { FC, useState, useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getModelItems } from 'services/strapi.service';
import { useParams } from 'react-router-dom';
import { ModelContext } from 'components/model/context';

interface Pagination<T = []> {
    index: number;
    size: number;
    count: number;
    total: number;
    // data: T;
}

const initialPaginate: Pagination = {
    index: 0,
    size: 10,
    count: 0,
    total: 0,
    // data: [],
};

const totalPages = (count: number, size: number) => {
    return Math.ceil(count / size);
};

export const ModelTablePagination: FC<{}> = () => {
    const { contentType } = useParams<{ contentType: string }>();
    const { count, setItems } = useContext(ModelContext);
    const [pagination, setPagination] = useState<Pagination>(initialPaginate);

    useEffect(() => {
        setPagination({ ...initialPaginate, count });
    }, [count]);

    const handlePagination = async (index: number) => {
        const { size } = pagination;

        const { data } = await getModelItems(contentType, { start: +index * size });
        setPagination({ ...pagination, index });
        setItems(data);
    };

    return (
        <ReactPaginate
            pageCount={totalPages(pagination.count, pagination.size)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => handlePagination(selected)}
            containerClassName="pagination mt-4"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item disabled"
            breakLinkClassName="page-link"
            activeClassName="active"
        />
    );
};
