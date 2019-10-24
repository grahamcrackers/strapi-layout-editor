import React, { FC, useRef, useState } from 'react';
import { useModelItem } from 'components/model-item/context/model-item.context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';

interface RelationsToggleProps {
    className?: string;
}

const FilterCheckbox = ({ ...props }) => {
    const checkboxRef = useRef(null);
    return <input type="checkbox" className="form-checkbox" ref={checkboxRef} {...props} />;
};

export const RelationsToggle: FC<RelationsToggleProps> = ({ className, ...props }) => {
    // get items from metadata
    const { metadata, filters, setFilters } = useModelItem();
    const { edit, editRelations } = metadata.layouts;
    const attributes = edit.flat().map(x => x.name);
    const initial = [...attributes, ...editRelations];

    // add or remove item to the filter list
    const handleChange = e => {
        const target = e.currentTarget;
        if (!target.checked) {
            setFilters([...filters, target.name]);
        }

        if (target.checked) {
            setFilters(filters.filter(name => name !== target.name));
        }
    };

    return (
        <div className={className}>
            <span className="text-gray-700">Filter Fields</span>
            <ul className="mt-2">
                {initial.map(value => (
                    <li key={value}>
                        <label className="inline-flex items-center">
                            <FilterCheckbox
                                name={value}
                                defaultChecked={!filters.includes(value)}
                                onChange={e => handleChange(e)}
                            />
                            <span className="ml-2">{value}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
