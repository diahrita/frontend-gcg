import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { DataPartner } from '@/types/partner';
import axios from 'axios';

export const fetchBusinessPartnerData = async (page: number = 1, limit: number = 5) => {
 
    if (typeof window === 'undefined') {
        return null;
    }

    let token = sessionStorage.getItem(Messages.TOKEN);
    
    if (!token) {
        return null; 
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
        return response.data;
       
    } catch (err: any) {
        const { status, message } = handleError(err);
        // console.error("Error fetching data:", message);
        return { status, data: null };
    }
};


const startFetchingData = () => {
    const intervalId = setInterval(async () => {
        const data = await fetchBusinessPartnerData();
        // console.log(data); 
    }, 15000);

    
};

startFetchingData();
