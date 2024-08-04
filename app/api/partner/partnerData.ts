import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { DataPartner } from '@/types/partner';
import axios from 'axios';

interface FetchResult {
    status: number;
    data: DataPartner[] | null;
}

export const fetchBusinessPartnerData = async (page: number = 1, limit: number = 5): Promise<FetchResult> => {
    const token = sessionStorage.getItem(Messages.TOKEN);

    if (!token) {
        sessionStorage.setItem(Messages.ERROR, Messages.TOKEN_NOT_FOUND);
        return { status: 401, data: null };
    }

    try {
        const response = await axios.get(APIEndpoints.BUSINESS_PARTNER, { 
            headers: AuthHeaders.getBearerToken(token),
            params: {
                page: page,
                limit: limit
            }
        });
        const data: DataPartner[] = response.data;
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data };

    }  catch (err: any) {
        const { status, message } = handleError(err);
        return { status, data: null };
    }
};
