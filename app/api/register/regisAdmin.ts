import { Messages } from '@/app/hendlererror/message/messages';
import { APIEndpoints } from '@/app/route/apiEndpoints';
import { RegisterAdmin } from '@/types/register';
import axios from 'axios';

interface FetchResult {
    status: number;
    data: any | null;
}

export const regisAdmin = async (regis: RegisterAdmin): Promise<FetchResult> => {
    // Validasi data registrasi
    if (!regis.username || !regis.password || !regis.short_name || !regis.email || !regis.phone) {
        sessionStorage.setItem(Messages.ERROR, Messages.VALIDATION_ERROR);
        return { status: 400, data: null }; 
    }

    try {
        // Log the registration data to the console
        console.log('Sending Registration Data:', regis);

        const response = await axios.post(
            APIEndpoints.REGIS_ADMIN,  // Pastikan URL endpoint benar
            regis,  // Mengirimkan data registrasi sebagai body permintaan
            { headers: { 'Content-Type': 'application/json' } } // Menyertakan header Content-Type
        );

        // Log the API response
        console.log('API Response:', response.data);

        // Menentukan tipe data berdasarkan struktur JSON yang dikembalikan oleh API
        const data = response.data; 
        sessionStorage.removeItem(Messages.ERROR);
        return { status: response.status, data };

    } catch (err: any) {
        // Menangani kesalahan yang mungkin terjadi
        const status = err.response?.status || 500;
        const message = err.response?.data?.message || 'An error occurred';
        sessionStorage.setItem(Messages.ERROR, message);
        console.error('Error occurred:', message); // Log the error message
        return { status, data: null };
    }
};