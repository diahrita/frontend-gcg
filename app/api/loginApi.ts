import axios from 'axios';
import { NextRouter } from 'next/router';
import toast from 'react-hot-toast';
import { getToken } from './token/jwtToken'; 

export const loginUser = async (username: string, password: string, router: NextRouter) => {
    const loadingToastId = toast.loading('Proses login...');

    if (!username) {
        toast.error('Username kosong');
        toast.dismiss(loadingToastId);
        return;
    } 
    if (!password) {
        toast.error('Password kosong');
        toast.dismiss(loadingToastId);
        return;
    }

    try {
        const response = await axios.post('/api/authentication', { username, password });

        if (response.data.valid_mac && parseInt(response.data.valid_mac) > 0) {
            toast.success('Login Sukses!');

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            if (response.data.hash && response.data.hash.trim() !== '') {
                sessionStorage.setItem('hash', response.data.hash);
                // Cek hash yang tersimpan di sessionStorage
                const storedHash = sessionStorage.getItem('hash');
                console.log('Stored Hash:', storedHash);

                // Mendapatkan token setelah login berhasil
                const token = await getToken(username);

                
                if (token) {
                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                }
            } else {
                toast.error('Akun anda tidak terdaftar!');
            }
        } else {
            toast.error('Terjadi kesalahan jaringan!');
        }

    } catch (err: any) {
        if (err.response) {
            if (err.response.status === 503) {
                toast.error('Server sedang dalam pemeliharaan. Silakan coba lagi nanti.');
            } else if (err.response.data) {
                console.error('Login gagal:', err.response.data);
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
