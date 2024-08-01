import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchBusinessPartnerData = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        toast.error('Token tidak ditemukan di session storage.');
        return null;  
    }

    try {
        const response = await axios.get('/api/erp/bussiness_pathner', {  
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Log the data to the console
        console.log('Business Partner Data:', response.data);

        return response.data;
    } 
    catch (err: any) {
        if (err.response) {
            if (err.response.status === 401) {
                toast.error('Token tidak valid atau kadaluarsa. Silakan login kembali.');
            } else if (err.response.status === 403) {
                toast.error('Akses ditolak. Periksa izin akses Anda.');
            } else {
                toast.error('Terjadi kesalahan pada server. Silakan coba lagi.');
            }
        } else if (err.request) {
            toast.error('Tidak dapat menghubungi server. Periksa koneksi internet Anda.');
        } else {
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        }
        return null;  
    }
};
