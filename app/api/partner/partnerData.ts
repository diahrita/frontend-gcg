import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { DataPartner } from '@/types/partner';
import axios from 'axios';

interface FetchResult {
    successCode: number;
    data: DataPartner[] | null;
}

export const fetchBusinessPartnerData = async (page: number = 1, limit: number = 5): Promise<FetchResult> => {
    if (typeof window === 'undefined') {
        return { successCode: 500, data: null }; // Return an error successCode if running server-side
    }

    const token = sessionStorage.getItem(Messages.TOKEN);

    if (!token) {
        return { successCode: 401, data: null }; // Return unauthorized successCode if token is missing
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

        // Assume response.data contains successCode
        const successCode = response.status; // Use response status code for successCode
        return { successCode, data };

    } catch (err: any) {
        const { status, message } = handleError(err);
        console.error("Error fetching data:", message); // Log the error message
        return { successCode: status, data: null };
    }
};

const startFetchingData = () => {
    const intervalId = setInterval(async () => {
        const result = await fetchBusinessPartnerData();
        // You can log or handle the result here
        console.log(result);
    }, 10000);
};

startFetchingData();
