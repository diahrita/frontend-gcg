import { Messages } from "@/app/hendlererror/message/messages";
import { handleError } from "@/app/hendlererror/server/errorHandler";
import { APIEndpoints } from "@/app/route/apiEndpoints";
import { AuthHeaders } from "@/app/route/authHeaders";
import { AssessmentItem, LabelAssessment } from "@/types/assessment";
import axios from "axios";
import { cekAssessment } from "./cekAssessment";

interface FetchResult {
    successCode: number;
    data: LabelAssessment | null;
    // data : AssessmentItem [] | null;
}

export const getDetailByHeaderId = async (header_id: number, code_alat: string, nipp: string): Promise<FetchResult> => {
    if (typeof window === 'undefined') {
        return { successCode: 500, data: null }; 
    }

    let token = sessionStorage.getItem(Messages.TOKEN);
    
    if (!token) {
        // console.error('Error: Token not found');
        return { successCode: 401, data: null };
    }

    try {
        // Get all assessments
        const result = await cekAssessment(code_alat, nipp);

        if (result.successCode !== 200 || !result.data) {
            return { successCode: result.successCode, data: null };
        }

        

        // Find specific detail by header_id
        const foundHeader = result.data.find(item => item.header_id === header_id);
        
        if (!foundHeader) {
            return { successCode: 404, data: null }; 
        }

        // Return the found header and its associated data
        return { successCode: 200, data: foundHeader };

    } catch (err: any) {
        const { status, message } = handleError(err);
        // console.error('Error occurred:', message);
        return { successCode: status, data: null };
    }
};


