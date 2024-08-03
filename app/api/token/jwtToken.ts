import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import axios from 'axios';

export const getToken = async (username: string) => {
    const hash = sessionStorage.getItem('hash');

    if (!hash) {
        return;
    }

    try {
        const response = await axios.post(APIEndpoints.TOKEN_JWT, { username, hash });

        sessionStorage.setItem(Messages.TOKEN, response.data.token);

        const storedToken = sessionStorage.getItem(Messages.TOKEN);
        // console.log('Stored Token:', storedToken);

        return response.data.token;
    } 

 catch (err: any) {
    const { message } = handleError(err);
    throw new Error(message);
}
    
};
