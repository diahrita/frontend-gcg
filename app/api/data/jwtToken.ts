import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import axios from 'axios';

let tokenUpdateInterval: NodeJS.Timeout | null = null;

export const getToken = async (username: string) => {
    const hash = sessionStorage.getItem('hash');

    if (!hash) {
        return;
    }

    try {
        const response = await axios.post(APIEndpoints.TOKEN_API, { username, hash });

        sessionStorage.setItem(Messages.TOKEN, response.data.token);

        const storedToken = sessionStorage.getItem(Messages.TOKEN);
        // console.log('Stored Token:', storedToken);

        return response.data.token;
    } catch (err: any) {
        const { message } = handleError(err);
        throw new Error(message);
    }
};

export const startTokenRefresh = (username: string) => {
    if (tokenUpdateInterval) {
        clearInterval(tokenUpdateInterval);
    }

    const fetchToken = async () => {
        try {
            await getToken(username);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    fetchToken();

    // Set interval to fetch token
    tokenUpdateInterval = setInterval(() => {
        fetchToken();
    }, 15000);
};

export const stopTokenRefresh = () => {
    if (tokenUpdateInterval) {
        clearInterval(tokenUpdateInterval);
        tokenUpdateInterval = null;
    }
};
