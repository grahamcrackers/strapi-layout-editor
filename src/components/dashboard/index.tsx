import React, { useState, useEffect } from 'react';
import { config } from '../../config/config';
import * as strapiService from '../../services/strapi.service';
import { Link, Route, Switch } from 'react-router-dom';
import { login } from '../../services/login.service';
import { ContentTypeItems } from '../../pages/content-types-items.page';
import { ExperienceEditorPage } from '../../pages/experience-editor.page';

export const Dashboard = () => {
    const [contentTypes, setContentTypes] = useState([]);

    const loginUser = async () => {
        await login(config.strapi.username as string, config.strapi.password as string);
    };

    const getContentTypes = async () => {
        const types = await strapiService.get('content-manager/content-types');
        console.log(types);
        setContentTypes(types.data);
    };

    // move to a login page but lol who has the time
    useEffect(() => {
        const initialize = async () => {
            await loginUser();
            await getContentTypes();
        };
        initialize();
    }, []);

    return (
        <article className="cf">
            <div className="fl w-20 bg-near-white t">
                <h1 className="f4 bold center mw6">Content Types</h1>
                <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
                    {contentTypes.map((type: any) => {
                        return (
                            <li key={`${type.uid}-key`} className="ph3 pv3 bb b--light-silver">
                                <Link to={`/dashboard/${type.uid}`}>{type.label}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="fl w-80 bg-light-gray">
                {/* <BasicLayout></BasicLayout> */}
                <Switch>
                    <Route exact={true} path="/dashboard/:contentType" component={ContentTypeItems} />
                    <Route exact={true} path="/dashboard/:contentType/:itemId" component={ExperienceEditorPage} />
                </Switch>
            </div>
        </article>
    );
    // <JsonStringify {...contentTypes}></JsonStringify>
};
