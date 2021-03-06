/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridPreview } from 'components/grid-preview';
import { ModelItemProvider } from 'components/model-item/context';
import { ModelProvider } from 'components/model/context';
import { ModelPage } from 'components/model/model-page';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { getModels } from 'services/strapi.service';
import { ModelItemLayouts } from '../model-item/model-item-layouts';

export const Dashboard = () => {
    const [contentTypes, setContentTypes] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            const models = await getModels();
            setContentTypes(models.data.data);
        };
        initialize();
    }, []);

    if (!contentTypes) {
        return null;
    }

    return (
        <div className="flex">
            <aside className="w-64 p-4">
                <h3 className="px-4 py-2 leading-none text-color-900 text-2xl font-normal">Content Types</h3>
                <ul className="border rounded">
                    {contentTypes.map((type: any, index) => {
                        return (
                            <li
                                key={`${type.uid}`}
                                className={`px-4 py-2 border-t ${index === 0 && 'first:border-t-0'}`}
                            >
                                <Link to={`/dashboard/${type.uid}`}>{type.label}</Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            <ModelProvider>
                <ModelItemProvider>
                    <Switch>
                        <Route exact={true} path="/dashboard/:contentType" component={ModelPage} />
                        <Route exact={true} path="/dashboard/:contentType/:itemId" component={ModelItemLayouts} />
                        <Route
                            exact={true}
                            path="/dashboard/:contentType/:itemId/grid-preview"
                            component={GridPreview}
                        />
                    </Switch>
                </ModelItemProvider>
            </ModelProvider>
        </div>
    );
};
