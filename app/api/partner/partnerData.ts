import { DataPartner } from '@/types/partner';
import axios from 'axios';

interface FetchResult {
    status: number;
    data: DataPartner[] | null;
}

export const fetchBusinessPartnerData = async (): Promise<FetchResult> => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        // Simpan pesan error ke sessionStorage
        sessionStorage.setItem('error', 'Token tidak ditemukan di session storage.');
        return { status: 401, data: null };
    }

    try {
        const response = await axios.get('/api/erp/business_partner', {  
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Log the data to the console
        console.log('Business Partner Data:', response.data);

        const data: DataPartner[] = response.data;
        // Save the data to session storage
        sessionStorage.setItem('businessPartnerData', JSON.stringify(data));

        // Clear any previous error messages from sessionStorage
        sessionStorage.removeItem('error');

        return { status: response.status, data };

    } catch (err: any) {
        let status = 500;
        let errorMessage = 'Terjadi kesalahan. Silakan coba lagi nanti.';

        if (err.response) {
            status = err.response.status;
            switch (status) {
                case 401:
                    errorMessage = 'Token tidak valid atau kadaluarsa. Silakan login kembali.';
                    break;
                case 502:
                case 500:
                    errorMessage = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
                    break;
            }
        } else {
            errorMessage = 'Terjadi kesalahan jaringan. Silakan coba lagi nanti.';
        }

        // Simpan pesan error ke sessionStorage
        sessionStorage.setItem('error', errorMessage);

        return { status, data: null };
    }
};
