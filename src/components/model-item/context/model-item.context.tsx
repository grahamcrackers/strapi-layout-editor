/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';
import React, { createContext, useState } from 'react';
import { Layout } from 'react-grid-layout';

interface ModelItemContextProps {
    metadata: ModelMetadata;
    setMetadata: React.Dispatch<any>;
    item: any;
    setItem: React.Dispatch<any>;
    layouts: Layout[];
    setLayouts: React.Dispatch<any>;
    filters: string[];
    setFilters: React.Dispatch<string[]>;
    modelLayoutId: string;
    setModelLayoutId: React.Dispatch<string>;
}

export const Context = createContext<ModelItemContextProps>({
    metadata: {} as ModelMetadata,
    setMetadata: () => {},
    item: {},
    setItem: () => {},
    layouts: [],
    setLayouts: () => {},
    filters: [],
    setFilters: () => {},
    modelLayoutId: '',
    setModelLayoutId: () => '',
});

export const Provider = ({ children }) => {
    // set up state for data we want to keep track of
    const [metadata, setMetadata] = useState({} as ModelMetadata);
    const [item, setItem] = useState({});
    const [layouts, setLayouts] = useState<Layout[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const [modelLayoutId, setModelLayoutId] = useState<string>('');

    const modelItemContext = {
        metadata,
        setMetadata,
        item,
        setItem,
        layouts,
        setLayouts,
        filters,
        setFilters,
        modelLayoutId,
        setModelLayoutId,
    };

    return <Context.Provider value={modelItemContext}>{children}</Context.Provider>;
};

export const useModelItem = () => {
    const context = React.useContext(Context);

    if (context === undefined) {
        throw new Error('useModelItem must be used within a ModelItemProvider');
    }

    return { ...context };
};
