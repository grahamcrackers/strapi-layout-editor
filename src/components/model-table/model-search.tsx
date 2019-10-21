import React, { useState, useEffect, useContext } from 'react';
import { ModelContext } from 'contexts/ModelContext';
import { getModelItems } from 'services/strapi.service';
import { useDebounce } from '../../common/hooks/useDebounce';

export const ModelSearch = () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 500);
    const { metadata, setCount, setItems } = useContext(ModelContext);

    // keep track if this component has been initialized so if the search box is
    // empty again, we want to search with a q of blank
    useEffect(() => {
        const getData = async () => {
            const { data } = await getModelItems(metadata.uid, { q: debouncedValue });

            setCount(data.length);
            setItems(data);
        };
        if (debouncedValue) getData();

        console.log(debouncedValue);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return <input className="form-input ml-auto" onChange={e => handleChange(e)} />;
};
