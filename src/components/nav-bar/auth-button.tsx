import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { getToken } from '../../services/token.service';
import { useAuthentication } from '../../common/hooks/useAuthentication';

// export const AuthButton = withRouter(({ history }) => {
//     return getToken() ? (
//     <Link
//         className="inline-flex items-center flex-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         to={location => {
//             console.log(`i've been had`);
//             // fakeAuth.signout(() => {});
//             return { ...location, pathname: '/' };
//         }}
//     >
//         Sign out
//     </Link>
// ) : (
//     <span>You are not logged in.</span>
// );
// });

export const AuthButton = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <>
            {isAuthenticated ? (
                <Link
                    className="inline-flex items-center flex-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    to={location => {
                        return { ...location, pathname: '/login' };
                    }}
                >
                    Sign out
                </Link>
            ) : (
                <span>You are not logged in.</span>
            )}
        </>
    );
};
