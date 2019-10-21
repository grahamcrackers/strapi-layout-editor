import React, { useEffect, useContext } from 'react';
import { getModelMetadata, getModelCount } from 'services/strapi.service';
import { useParams } from 'react-router';
import { ModelContext } from '../contexts/ModelContext';
import { JsonStringify } from 'common/json-stringify';
import { ModelTable } from '../components/model-table/model-table';

export const ModelPage = () => {
    const { contentType } = useParams<{ contentType: string }>();
    const { metadata, setMetadata, count, setCount } = useContext(ModelContext);

    useEffect(() => {
        const initialize = async () => {
            // get our model's metadata
            const modelMetadata = await getModelMetadata(contentType);
            setMetadata(modelMetadata.data.data);

            // get our model count
            const modelCount = await getModelCount(contentType);
            setCount(modelCount.data.count);
        };
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!metadata.uid && !count) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="mb-1 leading-none text-color-900 text-4xl font-light capitalize">{contentType}</h1>
            <p className="mt-0 mb-4 text-gray-600">{pagination.count} entries found</p>
            <hr className="my-8 border-b-2 border-gray-200" />
            <ModelTable />

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
