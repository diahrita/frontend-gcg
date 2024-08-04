import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { Assessment } from '@/types/assessment';

import axios from 'axios';

interface FetchResult {
    status: number;
    data: Assessment[] | null;
}

export const bankAssessment = async (code_alat: string, nipp: string): Promise<FetchResult> => {
    const token = sessionStorage.getItem(Messages.TOKEN);

    if (!token) {
        sessionStorage.setItem(Messages.ERROR, Messages.TOKEN_NOT_FOUND);
        return { status: 401, data: null };
    }

    try {
        const response = await axios.post(APIEndpoints.ASSESSMENT, 
            { code_alat, nipp },
            {
                headers: AuthHeaders.getBearerToken(token),
            }
        );
        const data: Assessment[] = response.data;
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data };

    } catch (err: any) {
        const { status, message } = handleError(err);
        return { status, data: null };
    }
};
