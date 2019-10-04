const tokenLabel = 'token';

interface Token {
    jwt: string;
}

export const setToken = (authToken: string) => {
    localStorage.setItem(tokenLabel, authToken);
};

export const getToken = (): string | null => {
    return localStorage.getItem(tokenLabel);
};
