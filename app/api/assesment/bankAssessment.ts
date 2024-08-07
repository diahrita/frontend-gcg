import { Messages } from '@/app/hendlererror/message/messages';
import { handleError } from '@/app/hendlererror/server/errorHandler';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { AuthHeaders } from '@/app/route/authHeaders';
import { LabelAndGroup } from '@/types/assessment';
import axios from 'axios';



interface FetchResult {
    successCode: number;
    data: LabelAndGroup[] | null;
}

export const bankAssessment = async (code_alat: string, nipp: string): Promise<FetchResult> => {
    if (typeof window === 'undefined') {
        return { successCode: 500, data: null }; 
    }

    let token = sessionStorage.getItem(Messages.TOKEN);
    
    if (!token) {
        console.error('Error: Token not found');
        return { successCode: 401, data: null }; 
    }

    try {
        const response = await axios.post(
            APIEndpoints.ASSESSMENT, 
            { code_alat, nipp }, 
            { headers: AuthHeaders.getBearerToken(token) }
        );

        const result: FetchResult = response.data;

        if (result.successCode === 200 && result.data) {
            const labelsAndGroups: LabelAndGroup[] = result.data.map(item => ({
                label: item.label,
                grup: item.grup
            }));

            // console.log(labelsAndGroups);

            return { successCode: result.successCode, data: labelsAndGroups };
        } else {
            return { successCode: result.successCode, data: null };
        }
        
    } catch (error) {
        handleError(error);
        return { successCode: 500, data: null };
    }
};
