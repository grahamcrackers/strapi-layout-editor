import React, { createContext, useState, useCallback } from 'react';
import { ModelMetadata } from '.';

interface ModelContextProps {
    metadata: ModelMetadata;
    setMetadata: React.Dispatch<ModelMetadata>;
    count: number;
    setCount: React.Dispatch<number>;
}

const initialContext = {
    metadata: {} as ModelMetadata,
    setMetadata: () => {},
    count: 0,
    setCount: () => {},
};

export const Context = createContext<ModelContextProps>(initialContext);

export const Provider = ({ children, ...props }) => {
    const [metadata, setMetadata] = useState(initialContext.metadata);
    const [count, setCount] = useState(initialContext.count);

    const modelContext = {
        metadata,
        setMetadata, //: updateMetadata,
        count,
        setCount,
    };

    return <Context.Provider value={modelContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
