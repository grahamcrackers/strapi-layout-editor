import { useModelItem } from 'components/model-item/context/model-item.context';
import React, { FC, useRef } from 'react';

interface RelationsToggleProps {
    className?: string;
}

const FilterCheckbox = ({ ...props }) => {
    const checkboxRef = useRef(null);
    return <input type="checkbox" className="form-checkbox" ref={checkboxRef} {...props} />;
};

export const RelationsToggle: FC<RelationsToggleProps> = ({ className, ...props }) => {
    // get items from metadata
    const { metadata, filters, setFilters, item } = useModelItem();
    const { edit, editRelations } = metadata.layouts;
    const attributes = edit.flat().map(x => x.name);
    const initial = [...attributes, ...editRelations];

    console.log(item);

    const disableCheckbox = () => {
        console.log(item);
    };
    disableCheckbox();

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
            <div className="text-gray-900 font-medium pb-4">Filter Fields</div>

            <span className="text-gray-900">Attributes</span>
            <ul className="mb-2">
                {initial
                    .filter(x => !editRelations.includes(x))
                    .map(value => {
                        return (
                            <li key={value}>
                                <label className={`inline-flex items-center`}>
                                    <FilterCheckbox
                                        name={value}
                                        defaultChecked={!filters.includes(value)}
                                        onChange={e => handleChange(e)}
                                    />
                                    <span className="ml-2">{value}</span>
                                </label>
                            </li>
                        );
                    })}
            </ul>
            <span className="text-gray-900">Relations</span>
            <ul className="mb-2">
                {initial
                    .filter(x => editRelations.includes(x))
                    // eslint-disable-next-line array-callback-return
                    .map(value => {
                        let disabled = false;

                        if (item[value]) {
                            disabled = !item[value].length;

                            return (
                                <li key={value}>
                                    <label className={`inline-flex items-center ${disabled && `text-gray-500`}`}>
                                        <FilterCheckbox
                                            name={value}
                                            disabled={disabled}
                                            defaultChecked={!filters.includes(value)}
                                            onChange={e => handleChange(e)}
                                        />
                                        <span className="ml-2">{`${value} (${item[value].length})`}</span>
                                    </label>
                                </li>
                            );
                        }
                    })}
            </ul>
        </div>
    );
};
