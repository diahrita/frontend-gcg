import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { getAuthHeaders } from '@/app/route/authHeaders';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getToken, startTokenRefresh } from '../data/jwtToken';
import { getProfile } from '../data/profileToken';

export const loginUser = async (username: string, password: string, router: ReturnType<typeof useRouter>): Promise<string> => {
    
    if (!username || !password) {
        const errorMsg = Messages.VALIDATION_ERROR;
        console.error('Validation Error:', errorMsg); // Log validation error
        throw new Error(errorMsg);
    }

    try {
        const headers = await getAuthHeaders(username);
        const response = await axios.post(APIEndpoints.AUTHENTICATION, { username, password }, { headers });

        if (response.status === 200) {
            const { hash } = response.data;

            // Memeriksa hash
            if (hash?.trim()) {
                sessionStorage.setItem('hash', hash);
                sessionStorage.setItem('username', username);

                // Mendapatkan token
                const token = await getToken(username);
                const profile = await getProfile(username);

                if (token) {
                    sessionStorage.removeItem(Messages.ERROR);
                    router.push('/'); 
                    startTokenRefresh(username);
                    return token;
                } else {
                    const errorMsg = Messages.TOKEN_INVALID;
                    console.error('Token Error:', errorMsg); // Log token error
                    throw new Error(errorMsg);
                }
            } else {
                const errorMsg = Messages.BAD_REQUEST;
                console.error('Bad Request Error:', errorMsg); // Log bad request error
                throw new Error(errorMsg);
            }
        } else {
            const errorMsg = Messages.BAD_REQUEST;
            console.error('Bad Request Error:', errorMsg); // Log bad request error
            throw new Error(errorMsg);
        }

    } catch (err: any) {
        const { message } = handleError(err);
        console.error('API Error:', message); // Log API error
        throw new Error(message);
    }
};
