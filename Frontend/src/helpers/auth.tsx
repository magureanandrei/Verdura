export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
};

export const getUserId = (): string | null => {
    return localStorage.getItem('userId');
};

export const clearAuth = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
};
