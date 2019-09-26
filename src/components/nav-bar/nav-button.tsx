import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';

export const NavButton: FC<{}> = () => {
    const history = useHistory();
    const [token] = useLocalStorage('token', '');

    return (
        <button
            className="f6 link dim br1 ba ph3 pv2 mb2 dib mid-gray"
            onClick={() => {
                fakeAuth.signout(() => history.push('/'));
            }}
        >
            Sign {token ? 'in' : 'out'}
        </button>
    );
};
