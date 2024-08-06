import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { Assessment } from '@/types/assessment';
import axios from 'axios';

interface FetchResult {
    successCode: number;
    data: Assessment[] | null;
}

export const bankAssessment = async (code_alat: string, nipp: string): Promise<FetchResult> => {
    if (typeof window === 'undefined') {
        return { successCode: 500, data: null }; // Return an error successCode if running server-side
    }

    let token = sessionStorage.getItem(Messages.TOKEN);
    
    if (!token) {
        console.error('Error: Token not found');
        return { successCode: 401, data: null }; // Return unauthorized successCode if token is missing
    }

    try {
        const response = await axios.post(
            APIEndpoints.ASSESSMENT, 
            { code_alat, nipp },
            {
                headers: AuthHeaders.getBearerToken(token),
            }
        );
        const data: Assessment[] = response.data;
        console.log('API Response Data:', data); // Log the data received from the API
        return { successCode: response.data.successCode, data };

    } catch (err: any) {
        const { status, message } = handleError(err);
        console.error('Error occurred:', message); // Log the error message
        return { successCode: status, data: null };
    }
};
