import React, { FC } from 'react';
import { ContentData } from './useContentData';

interface ContentDataCardProps {
    key: string | number;
    data: ContentData;
}

export const LayoutCard: FC<ContentDataCardProps> = ({ key, data, ...rest }) => {
    return (
        <div key={data.key} className="rounded shadow bg-white">
            <span>{data.key}</span>
            <pre>
                <code>{JSON.stringify(data.value)}</code>
            </pre>
        </div>
    );
};
