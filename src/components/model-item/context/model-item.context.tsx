import React, { createContext, useState, useEffect } from 'react';
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

export const Context = createContext<ModelItemContextProps>({
    metadata: {} as ModelMetadata,
    setMetadata: () => {},
    item: {},
    setItem: () => {},
    layouts: [],
    setLayouts: () => {},
});

export const Provider = ({ children }) => {
    // set up state for data we want to keep track of
    const [metadata, setMetadata] = useState({} as ModelMetadata);
    const [item, setItem] = useState({});
    const [layouts, setLayouts] = useState<Layout[]>([]);

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

export const useModelItem = () => {
    const context = React.useContext(Context);

    if (context === undefined) {
        throw new Error('useModelItem must be used within a ModelItemProvider');
    }

    return context;
};
