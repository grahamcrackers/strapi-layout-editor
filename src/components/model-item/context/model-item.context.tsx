import React, { createContext, useState } from 'react';
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';
import { Layout } from 'react-grid-layout';

interface ModelItemContextProps {
    metadata: ModelMetadata;
    setMetadata: React.Dispatch<any>;
    item: any;
    setItem: React.Dispatch<any>;
    layouts: Layout[];
    setLayouts: React.Dispatch<any>;
}

const initialContext = {
    metadata: {} as ModelMetadata,
    setMetadata: () => {},
    item: {},
    setItem: () => {},
    layouts: [],
    setLayouts: () => {},
};

export const Context = createContext<ModelItemContextProps>(initialContext);

export const Provider = ({ children, ...props }) => {
    const [metadata, setMetadata] = useState(initialContext.metadata);
    const [item, setItem] = useState(initialContext.item);
    const [layouts, setLayouts] = useState<Layout[]>(initialContext.layouts);

    const modelItemContext = {
        metadata,
        setMetadata,
        item,
        setItem,
        layouts,
        setLayouts,
    };

    return <Context.Provider value={modelItemContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
