import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { getAuthHeaders } from '@/app/route/authHeaders';
import axios from 'axios';
import { NextRouter } from 'next/router';
import { getToken } from '../token/jwtToken';

export const loginUser = async (username: string, password: string, router: NextRouter): Promise<string> => {
    
    if (!username || !password) {
        throw new Error(Messages.VALIDATION_ERROR);
    }

    try {
        const headers = await getAuthHeaders(username);
        const response = await axios.post(APIEndpoints.AUTHENTICATION, { username, password }, { headers });

        if (response.status === 200) {
            const { hash } = response.data;

            // Memeriksa hash
            if (hash?.trim()) {
                sessionStorage.setItem('hash', hash);

                // Mendapatkan token
                const token = await getToken(username);

                if (token) {
                    sessionStorage.removeItem(Messages.ERROR);
                    router.push('/');
                    return token;
                } else {
                    throw new Error(Messages.TOKEN_INVALID);
                }
            } else {
                throw new Error(Messages.BAD_REQUEST); 
            }
        } else {
            throw new Error(Messages.BAD_REQUEST); 
        }

    } catch (err: any) {
        const { message } = handleError(err);
        throw new Error(message);
    }
};
