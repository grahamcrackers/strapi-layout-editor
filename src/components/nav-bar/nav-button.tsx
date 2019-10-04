import React, { FC } from 'react';
import { useAuthentication } from '../../common/hooks/useAuthentication';

export const NavButton: FC<{}> = () => {
    const { isAuthenticated, onLogout } = useAuthentication();

    const btnClass = 'border border-blue-400 rounded mr-4 my-3 px-4 ml-auto';

    return (
        <>
            {isAuthenticated && (
                <button
                    className={btnClass}
                    onClick={() => {
                        onLogout();
                    }}
                >
                    Sign out
                </button>
            )}
        </>
    );
};
