import axios from 'axios';
import { NextRouter } from 'next/router';
import { getToken } from './token/jwtToken';

export const loginUser = async (username: string, password: string, router: NextRouter): Promise<string> => {
    if (!username || !password) {
        throw new Error('Username atau password tidak boleh kosong');
    }

    try {
        const response = await axios.post('/api/authentication', { username, password });

        if (response.status === 200) {
            const data = response.data;

            if (data.valid_mac && parseInt(data.valid_mac) > 0) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                if (data.hash && data.hash.trim() !== '') {
                    sessionStorage.setItem('hash', data.hash);
                    const storedHash = sessionStorage.getItem('hash');
                    // console.log('Stored Hash:', storedHash);

                    // Mendapatkan token setelah login berhasil
                    const token = await getToken(username);

                    if (token) {
                        router.push('/');
                        return token;
                    } else {
                        throw new Error('Lakukan sekali lagi.');
                    }
                } else {
                    throw new Error('Akun anda tidak terdaftar!');
                }
            } else {
                throw new Error('Terjadi kesalahan jaringan!');
            }
        } else {
            throw new Error('Login gagal! Cek username dan password anda.');
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
