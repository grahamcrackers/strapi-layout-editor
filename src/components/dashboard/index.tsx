import React, { useState, useEffect } from 'react';
import * as strapiService from '../../services/strapi.service';
import { Link, Route, Switch } from 'react-router-dom';
import { ExperienceEditor } from '../../components/experience-editor';
import { GridPreview } from 'components/grid-preview';
import { ModelPage } from 'pages/model.page';
import { ModelProvider } from 'contexts/ModelContext';
import { ModelLayout } from 'components/model-item/model-layout';
import { ModelItemProvider } from 'components/model-item/context';

export const Dashboard = () => {
    const [contentTypes, setContentTypes] = useState([]);

    const getContentTypes = async () => {
        const types = await strapiService.get('content-manager/content-types');
        setContentTypes(types.data);
    };

    useEffect(() => {
        const initialize = async () => {
            await getContentTypes();
        };
        initialize();
    }, []);

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
                        <Route exact={true} path="/dashboard/:contentType/:itemId" component={ModelLayout} />
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
