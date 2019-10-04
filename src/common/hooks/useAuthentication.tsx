import React, { useState, useEffect, useContext, createContext } from 'react';
import { getToken, setToken } from '../../services/token.service';

interface AuthContextProps {
    isAuthenticated: boolean;
    redirectToReferrer: boolean;
    onLogin: (token: string) => void;
    onLogout: () => void;
}

const initialProps = {
    isAuthenticated: false,
    redirectToReferrer: false,
    onLogin: (token: string) => {},
    onLogout: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initialProps);
export const AuthDataProvider = props => {
    console.log('AuthDataProvider');
    const [authData, setAuthData] = useState<AuthContextProps>(initialProps);

    /* The first time the component is rendered, it tries to
     * fetch the auth data from a source, like a cookie or
     * the localStorage.
     */
    useEffect(() => {
        const token = getToken();
        console.log(token);
        if (token) {
            setAuthData({ ...authData, isAuthenticated: true, redirectToReferrer: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLogin = async (token: string) => {
        setToken(token);
        setAuthData({ ...authData, isAuthenticated: true, redirectToReferrer: true });
    };

    const onLogout = async () => {
        localStorage.removeItem('token');
        setAuthData({ ...authData, isAuthenticated: false, redirectToReferrer: false });
    };

    return <AuthContext.Provider value={{ ...authData, onLogin, onLogout }} {...props} />;
};

export const useAuthentication = () => useContext(AuthContext);
