'use client';
import { loginUser } from '@/app/api/loginApi';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
    googleData: any;
}

const LoginPage = ({ googleData }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    // Load saved credentials from localStorage
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername) {
            setUsername(savedUsername);
        }
        if (savedPassword) {
            setPassword(savedPassword);
        }
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await loginUser(username, password, router); 
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    // Handle changes to username with validation
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.slice(0, 20); 
        setUsername(input);
    };

    // Handle changes to password with validation
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.slice(0, 20);
        setPassword(input);
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
                            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                placeholder="Alamat Email atau Username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: '1rem' }}
                            />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password
                                inputId="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                                toggleMask
                                feedback={false}
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            />

                            <div className="flex align-items-center justify-content-between mb-1 gap-5">
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
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
            <Toaster position="top-right" />
        </div>
    );
};

export default LoginPage;
