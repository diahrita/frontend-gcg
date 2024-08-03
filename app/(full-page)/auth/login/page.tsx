'use client';
import { loginUser } from '@/app/api/login/loginApi';
import { Messages } from '@/app/hendlererror/message/messages';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const expirationTime = sessionStorage.getItem('expirationTime');

        if (token && expirationTime) {
            const isExpired = Date.now() > parseInt(expirationTime);
            if (!isExpired) {
                router.push('/');
            } else {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('expirationTime');
            }
        }

        // Ambil pesan error dari sessionStorage
        const storedError = sessionStorage.getItem('error');
        if (storedError) {
            setError(storedError);
            sessionStorage.removeItem('error');
        }
    }, [router]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        setUsernameError('');
        setPasswordError('');

        if (!username) {
            setUsernameError(Messages.USERNAME_ERROR_PLACEHOLDER);
            setLoading(false);
            return;
        }

        if (!password) {
            setPasswordError(Messages.PASSWORD_ERROR_PLACEHOLDER);
            setLoading(false);
            return;
        }

        try {
            const token = await loginUser(username, password, router);
            // Simpan token dan waktu kedaluwarsa (6 jam)
            const expirationTime = Date.now() + 6 * 60 * 60 * 1000; 
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('expirationTime', expirationTime.toString());
        } catch (err: any) {
            setError(err.message);
            sessionStorage.removeItem('error');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value.slice(0, 20));
        setUsernameError('');
        setError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.slice(0, 20));
        setPasswordError('');
        setError('');
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
                            <div className="text-900 text-3xl font-medium mb-3">{Messages.WELCOME_TEXT}</div>
                            <span className="text-600 font-medium">{Messages.LOGIN_PROMPT_TEXT}</span>
                        </div>

                        <div>
                           <div className="flex align-items-center justify-content-between mb-1 gap-5">
                                {error && <p className="text-red-500" style={{ whiteSpace: 'pre-line' }}>{error}</p>}
                            </div>

                            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                {Messages.DEFAULT_USERNAME}
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                placeholder={usernameError || Messages.DEFAULT_USERNAME_PLACEHOLDER}
                                value={username}
                                onChange={handleUsernameChange}
                                className={`w-full md:w-30rem mb-5 ${usernameError ? 'border-red-500 input-error' : ''}`}
                                style={{ padding: '1rem' }}
                                disabled={loading}
                            />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                {Messages.DEFAULT_PASSWORD_PLACEHOLDER}
                            </label>
                            <Password
                                inputId="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder={passwordError || Messages.DEFAULT_PASSWORD_PLACEHOLDER}
                                toggleMask
                                feedback={false}
                                className={`w-full mb-5 ${passwordError ? 'border-red-500 input-error' : ''}`}
                                inputClassName={`w-full p-3 md:w-30rem ${passwordError ? 'border-red-500 input-error' : ''}`}
                                disabled={loading}
                            />

                            <div className="flex align-items-center justify-content-between mb-1 gap-5" />
                            <Button
                                label={loading ? Messages.BUTTON_LOADING_TEXT : Messages.BUTTON_LOGIN_TEXT}
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
