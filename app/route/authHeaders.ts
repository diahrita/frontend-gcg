// src/api/authHeaders.ts
import { getToken } from '@/app/api/token/jwtToken';

export const AuthHeaders = {
    getBearerToken: (token: string) => ({
        Authorization: `Bearer ${token}`,
    }),
};

export const getAuthHeaders = async (username: string) => {
    const token = await getToken(username); 
    return AuthHeaders.getBearerToken(token);
};
