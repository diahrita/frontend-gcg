import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { AssessmentItem, LabelAssessment } from '@/types/assessment';
import axios from 'axios';

interface FetchResult {
    successCode: number;
    data: LabelAssessment[] | null;
}


// nip ini == username
// code alat = GCG

export const cekAssessment = async (code_alat: 'RTG-22', nipp: '8606120200'): Promise<FetchResult> => {
    if (typeof window === 'undefined') {
        return { successCode: 500, data: null }; 
    }

    let token = sessionStorage.getItem(Messages.TOKEN);
    
    if (!token) {
        // console.error('Error: Token not found');
        return { successCode: 401, data: null };
    }

    try {
        const response = await axios.post(
            APIEndpoints.ASSESSMENT, 
            { code_alat, nipp },
            {
                headers: AuthHeaders.getBearerToken(token),
            }
        );
        
        const data: LabelAssessment[] = response.data.data;

        
        
        // console.log('API Response Data ini ya:', data); 
        return { successCode: response.data.successCode, data };

    } catch (err: any) {
        const { status, message } = handleError(err);
        // console.error('Error occurred:', message);
        return { successCode: status, data: null };
    }
};

