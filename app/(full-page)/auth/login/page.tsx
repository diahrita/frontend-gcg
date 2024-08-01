'use client';
import { loginUser } from '@/app/api/loginApi';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useContext, useEffect, useState } from 'react';
import './styles.css';

interface Props {
    googleData: any;
}

const LoginPage = ({ googleData }: Props) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const expirationTime = sessionStorage.getItem('expirationTime');

        if (token && expirationTime) {
            const isExpired = Date.now() > parseInt(expirationTime);
            if (!isExpired) {
                router.push('/');
            } else {
                // Jika token expired, hapus dari sessionStorage
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('expirationTime');
            }
        }
    }, [router]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        setUsernameError('');
        setPasswordError('');

        if (!username) {
            setUsernameError('Username belum diisi');
            setLoading(false);
            return;
        }

        if (!password) {
            setPasswordError('Password belum diisi');
            setLoading(false);
            return;
        }

        try {
            const token = await loginUser(username, password, router);
            // Simpan token dan waktu kedaluwarsa (6 jam)
            const expirationTime = Date.now() + 6 * 60 * 60 * 1000; // 6 jam dalam milidetik
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('expirationTime', expirationTime.toString());
        } catch (err) {
            setError('Login gagal. Silakan periksa username dan password Anda.');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value.slice(0, 20));
        setUsernameError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.slice(0, 20));
        setPasswordError('');
    };



    return (
        <div className="container-classname">
            <div className="flex flex-column align-items-center justify-content-center">
                <div className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-4 px-2 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/layout/images/tps.png" alt="Image" height="100" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Selamat Datang</div>
                            <span className="text-600 font-medium">Login untuk melanjutkan</span>
                        </div>

                        <div>
                            <div className="flex align-items-center justify-content-between mb-1 gap-5">
                                {error && <p className="text-red-500">{error}</p>} 
                            </div>

                            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                placeholder={usernameError || "Alamat Email atau Username"}
                                value={username}
                                onChange={handleUsernameChange}
                                className={`w-full md:w-30rem mb-5 ${usernameError ? 'border-red-500 input-error' : ''}`}
                                style={{ padding: '1rem' }}
                                disabled={loading}
                            />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password
                                inputId="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder={passwordError || "Password"}
                                toggleMask
                                feedback={false}
                                className={`w-full mb-5 ${passwordError ? 'border-red-500 input-error' : ''}`}
                                inputClassName={`w-full p-3 md:w-30rem ${passwordError ? 'border-red-500 input-error' : ''}`}
                                disabled={loading}
                            />

                            <div className="flex align-items-center justify-content-between mb-1 gap-5" />
                            <Button
                                label={loading ? 'Loading...' : 'Login'}
                                className="w-full p-3 text-xl"
                                onClick={handleLogin}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5 w-6rem flex-shrink-0" />
            </div>
        </div>
    );
};

export default LoginPage;
