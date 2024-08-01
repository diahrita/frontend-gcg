import axios from 'axios';
import toast from 'react-hot-toast';

export const getToken = async (username: string) => {
    const hash = sessionStorage.getItem('hash');

    if (!hash) {
        toast.error('Hash tidak ditemukan di session storage.');
        return;
    }

    try {
        const response = await axios.post('/api/token', { username, hash });

        sessionStorage.setItem('token', response.data.token);

        const storedToken = sessionStorage.getItem('token');
        console.log('Stored Token:', storedToken);

        return response.data.token;
    } 
    catch (err: any) {
        if (err.response) {
            if (err.response.status === 503) {
                toast.error('Server sedang dalam pemeliharaan. Silakan coba lagi nanti.');
            } else {
                toast.error('Terjadi kesalahan pada server. Silakan coba lagi.');
            }
        } else if (err.request) {
            toast.error('Tidak dapat menghubungi server. Periksa koneksi internet Anda.');
        } else {
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        }
    }
    
};
