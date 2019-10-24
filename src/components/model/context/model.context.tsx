/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';

interface ModelContextProps {
    metadata: ModelMetadata;
    setMetadata: React.Dispatch<ModelMetadata>;
    count: number;
    setCount: React.Dispatch<number>;
    items: any;
    setItems: any;
}

const initialContext = {
    metadata: {} as ModelMetadata,
    setMetadata: () => {},
    count: 0,
    setCount: () => {},
    items: [],
    setItems: () => [],
};

export const Context = createContext<ModelContextProps>(initialContext);

export const Provider = ({ children, ...props }) => {
    const [metadata, setMetadata] = useState(initialContext.metadata);
    const [count, setCount] = useState(initialContext.count);
    const [items, setItems] = useState([]);

    const modelContext = {
        metadata,
        setMetadata,
        count,
        setCount,
        items,
        setItems,
    };

    return <Context.Provider value={modelContext}>{children}</Context.Provider>;
};

export const useModel = () => {
    const context = React.useContext(Context);

    if (context === undefined) {
        throw new Error('useModel must be used within a ModelProvider');
    }
    return context;
};
