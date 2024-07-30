import axios from 'axios';
import toast from 'react-hot-toast';

export const loginUser = async (username: string, password: string, router: any) => {
    const loadingToastId = toast.loading('Proses login...');

    if (!username && !password) {
        toast.error('Username dan password kosong');
        toast.dismiss(loadingToastId);
        return;
    } else if (!username) {
        toast.error('Username kosong');
        toast.dismiss(loadingToastId);
        return;
    } else if (!password) {
        toast.error('Password kosong');
        toast.dismiss(loadingToastId);
        return;
    }

    try {
        const response = await axios.post('/api/authentication', { username, password });

        // console.log('Response Data:', response.data);

        if (response.data.valid_mac && parseInt(response.data.valid_mac) > 0) {
            // Login successful
            toast.success('Login Sukses!');

            // Store credentials in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Store hash in sessionStorage if available
            if (response.data.hash && response.data.hash.trim() !== '') {
                sessionStorage.setItem('hash', response.data.hash);

                const storedHash = sessionStorage.getItem('hash');
                console.log('Stored Hash:', storedHash);
            }

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            // Handle invalid MAC case
            toast.error('Terjadi kesalahan jaringan!');
        }

    } catch (err: any) {
        // console.error('Error during login:', err);

        if (err.response) {
            if (err.response.status === 503) {
                toast.error('Server sedang dalam pemeliharaan. Silakan coba lagi nanti.');
            } else if (err.response.data) {
                console.error('Login failed:', err.response.data);
                toast.error('Login gagal! Cek username dan password anda.');
            } else {
                toast.error('Terjadi kesalahan saat login.');
            }
        } else {
            toast.error('Terjadi kesalahan saat login.');
        }
        
    } finally {
        toast.dismiss(loadingToastId);
    }
};