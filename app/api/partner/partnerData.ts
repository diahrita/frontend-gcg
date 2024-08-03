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

export const fetchBusinessPartnerData = async (): Promise<FetchResult> => {
    const token = sessionStorage.getItem(Messages.TOKEN);

    if (!token) {
        // Simpan pesan error ke sessionStorage
        sessionStorage.setItem(Messages.ERROR, Messages.TOKEN_NOT_FOUND);
        return { status: 401, data: null };
    }

    try {
        const response = await axios.get(APIEndpoints.BUSINESS_PARTNER, { 
            headers: AuthHeaders.getBearerToken(token),
        });
        // console.log('Business Partner Data:', response.data);
        const data: DataPartner[] = response.data;
        // Save the data to session storage
        sessionStorage.setItem('businessPartnerData', JSON.stringify(data));
        // Clear any previous error messages from sessionStorage
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data };

    }  catch (err: any) {
        const { status, message } = handleError(err);
        
        return { status, data: null };
    }
};
