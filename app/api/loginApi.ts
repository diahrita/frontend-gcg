import axios from 'axios';
import { NextRouter } from 'next/router';
import { getToken } from './token/jwtToken';

export const loginUser = async (username: string, password: string, router: NextRouter): Promise<string> => {
    // Validasi input username dan password
    if (!username || !password) {
        throw new Error('Username atau password tidak boleh kosong');
    }

    try {
        const response = await axios.post('/api/authentication', { username, password });

        if (response.data.valid_mac && parseInt(response.data.valid_mac) > 0) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            if (response.data.hash && response.data.hash.trim() !== '') {
                sessionStorage.setItem('hash', response.data.hash);
                const storedHash = sessionStorage.getItem('hash');
                console.log('Stored Hash:', storedHash);

                // Mendapatkan token setelah login berhasil
                const token = await getToken(username);

                if (token) {
                    router.push('/');
                    return token;
                } else {
                    throw new Error('Gagal mendapatkan token.');
                }
            } else {
                throw new Error('Akun anda tidak terdaftar!');
            }
        } else {
            throw new Error('Terjadi kesalahan jaringan!');
        }

    } catch (err: any) {
        if (err.response) {
            if (err.response.status === 503) {
                throw new Error('Server sedang dalam pemeliharaan. Silakan coba lagi nanti.');
            } else if (err.response.data) {
                console.error('Login gagal:', err.response.data);
                throw new Error('Login gagal! Cek username dan password anda.');
            } else {
                throw new Error('Terjadi kesalahan saat login.');
            }
        } else {
            throw new Error('Terjadi kesalahan saat login.');
        }
    }

    return '';
};