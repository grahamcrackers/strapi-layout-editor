import React, { createContext, useState, useCallback } from 'react';

interface ModelContextProps {
    metadata: any;
    setMetadata: React.Dispatch<any>;
    count: any;
    setCount: React.Dispatch<any>;
}

const initialContext = {
    metadata: {},
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
