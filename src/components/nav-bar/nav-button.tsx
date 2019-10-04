import React, { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';
import { useAuthentication } from '../../common/hooks/useAuthentication';

// <Link
// to="/login"
// className="inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
// >
// Sign In
// </Link>

export const NavButton: FC<{}> = () => {
    const history = useHistory();
    // const [token] = useLocalStorage('token', '');
    const { isAuthenticated, onLogout } = useAuthentication();

    const btnClass = 'border border-blue-400 rounded mr-4 my-3 px-4 ml-auto';

    return (
        <>
            {isAuthenticated ? (
                <button
                    className={btnClass}
                    onClick={() => {
                        onLogout();
                        // fakeAuth.signout(() => history.push('/login'));
                    }}
                >
                    Sign out
                </button>
            ) : (
                <button
                    className={btnClass}
                    onClick={() => {
                        // fakeAuth.signout(() => history.push('/login'));
                    }}
                >
                    Sign in
                </button>
            )}
        </>
    );
};
