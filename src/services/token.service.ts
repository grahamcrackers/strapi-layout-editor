const tokenLabel = 'token';

export const saveToken = (authToken: string) => {
    localStorage.setItem(tokenLabel, authToken);
};

export const getToken = (): string | null => {
    const token = localStorage.getItem(tokenLabel);
    return token;
};
