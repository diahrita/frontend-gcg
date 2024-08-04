import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { DataPartner } from '@/types/partner';
import { RegisterPayload } from '@/types/register';
import axios from 'axios';


interface FetchResult {
    status: number;
    data: DataPartner[] | null;
}

export const regisAdmin = async (payload: RegisterPayload): Promise<FetchResult> => {
    const token = sessionStorage.getItem(Messages.TOKEN);

    if (!token) {
        sessionStorage.setItem(Messages.ERROR, Messages.TOKEN_NOT_FOUND);
        return { status: 401, data: null };
    }

    try {
        const response = await axios.post(
            APIEndpoints.BUSINESS_PARTNER,
            payload,
            {
                headers: AuthHeaders.getBearerToken(token),
            }
        );

        const data: DataPartner[] = response.data;
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data };

    } catch (err: any) {
        const { status, message } = handleError(err);
        sessionStorage.setItem(Messages.ERROR, message);
        return { status, data: null };
    }
};