import React, { createContext, useState } from 'react';

interface ModelItemContextProps {
    modelItem: unknown;
    setModelItem: React.Dispatch<any>;
}

const initialContext = {
    modelItem: {},
    setModelItem: () => {},
};

export const Context = createContext<ModelItemContextProps>(initialContext);

export const Provider = ({ children, ...props }) => {
    const [modelItem, setModelItem] = useState();

    const modelItemContext = {
        modelItem,
        setModelItem,
    };

    return <Context.Provider value={modelItemContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
