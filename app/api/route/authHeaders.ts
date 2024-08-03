export const AuthHeaders = {
    getBearerToken: (token: string) => ({
        Authorization: `Bearer ${token}`,
    }),
};