import { Messages } from '@/app/hendlererror/message/messages';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { RegisterAdmin } from '@/types/register';
import axios from 'axios';

interface FetchResult {
    status: number;
    data: any | null;
}

export const regisAdmin = async (regis: RegisterAdmin): Promise<FetchResult> => {
    // Validasi input
    if (!regis.username || !regis.password || !regis.short_name || !regis.email || !regis.phone) {
        sessionStorage.setItem(Messages.ERROR, Messages.VALIDATION_ERROR);
        return { status: 400, data: null }; 
    }

    try {
        // Log data pendaftaran untuk debugging
        console.log('Sending Registration Data:', regis);

        // Mengirimkan permintaan POST ke API
        const response = await axios.post(
            APIEndpoints.REGIS_ADMIN, 
            regis,  
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Log respons API
        console.log('API Response:', response.data);

        // Menghapus pesan error jika permintaan berhasil
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data: response.data };

    } catch (err: any) {
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || 'An error occurred';
        sessionStorage.setItem(Messages.ERROR, message);
        console.error('Error occurred:', message); // Log pesan error
        return { status, data: null };
    }
};