import React, { FC } from 'react';

interface RelationsToggleProps {
    className: string;
    attributes: string[];
    relations: string[];
}

export const RelationsToggle: FC<RelationsToggleProps> = ({ className, ...props }) => {
    return (
        <div className={className}>
            <span className="text-gray-700">Checkboxes</span>
            <div className="mt-2">
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox text-indigo-600" checked />
                        <span className="ml-2">Option 1</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox text-green-500" checked />
                        <span className="ml-2">Option 2</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox text-pink-600" checked />
                        <span className="ml-2">Option 3</span>
                    </label>
                </div>
            </div>
        </div>
    );
};
