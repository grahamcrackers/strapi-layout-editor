import React from 'react';
import { ContentType } from '../../interfaces/ContentType';
import { Table } from '../../ui/table';
import { ContentTypeTableBody } from './table-body';
import { ContentTypeTableHeaders } from './table-headers';

export const ContentTypeTable = (contentType: ContentType<any>) => {
    return (
        <div>
            <Table className="border">
                {/* <ContentTypeTableHeaders layouts={schema.layouts} metadatas={schema.metadatas} /> */}
                {/* <ContentTypeTableBody layouts={schema.layouts} items={items} /> */}
            </Table>
            <div id="pagination">
                <div className="inline-flex">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Prev
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                        Next
                    </button>
                </div>
                <div className=".pagination">
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Prev</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">1</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">2</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">3</div>
                    <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Next</div>
                </div>
            </div>
        </div>
    );
};
