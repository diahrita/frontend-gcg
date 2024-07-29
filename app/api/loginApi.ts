import axios from 'axios';
import toast from 'react-hot-toast';

export const loginUser = async (username: string, password: string, router: any) => {
    // Show loading toast
    const loadingToastId = toast.loading('Proses login...');

    // Basic validation
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
        const response = await axios.post('/api/login', { username, password });

        // Check if the status code in the response is '200'
        if (response.data.StatusCode === '200') {
            console.log('Login successful:', response.data);
            toast.success('Login Sukses');

            // Store credentials in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password); 

            setTimeout(() => {
                router.push('/');
            }, 2000); 
        } else {
            console.error('Login failed:', response.data);
            toast.error('Login gagal! Cek username dan password anda.');
        }
    } catch (err: unknown) {
        console.error('Error during login:', err);

        let errorMessage = 'Login gagal! Cek username dan password anda.';

        if (axios.isAxiosError(err)) {
            if (err.response) {
                console.error('Response error data:', err.response.data);
                // Customize error messages based on response
                if (err.response.data.message === 'Username tidak sesuai') {
                    toast.error('Username tidak sesuai');
                } else if (err.response.data.message === 'Password tidak sesuai') {
                    toast.error('Password tidak sesuai');
                } else if (err.response.data.message === 'Username dan password salah') {
                    toast.error('Username dan password salah');
                } else {
                    toast.error('Terjadi kesalahan pada server');
                }
                errorMessage = err.response.data.message || 'Server responded with an error.';
            } else if (err.request) {
                console.error('No response received:', err.request);
                toast.error('Tidak ada respons dari server. Periksa koneksi jaringan Anda.');
            } else {
                console.error('Error message:', err.message);
                toast.error(err.message);
            }
        } else if (err instanceof Error) {
            console.error('Error message:', err.message);
            toast.error(err.message);
        }

        toast.error(errorMessage);
    } finally {
        toast.dismiss(loadingToastId);
    }
};
