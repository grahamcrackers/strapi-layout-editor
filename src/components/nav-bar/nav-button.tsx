import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';

export const NavButton: FC<{}> = () => {
    const history = useHistory();
    const [token] = useLocalStorage('token', '');

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
                fakeAuth.signout(() => history.push('/'));
            }}
        >
            Sign {token ? 'in' : 'out'}
        </button>
    );
};
