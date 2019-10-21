import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface ModelTablePaginationProps {
    totalPages: number;
    handlePagination: (selected) => {};
}

export const ModelTablePagination: FC<ModelTablePaginationProps> = ({ totalPages, handlePagination }) => {
    return (
        <ReactPaginate
            pageCount={totalPages}
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
