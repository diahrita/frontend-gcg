'use client'
import { LayoutContext } from '@/layout/context/layoutcontext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useContext, useState } from 'react';

interface Props {
    googleData: any;  
}

const LoginPage = ({ googleData }: Props) => {
    console.log('Received data in component:', googleData); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        // Basic validation
        if (!username || !password) {
            setError('Username and password are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/login', { 
                username,
                password
            });

            console.log('Login successful:', response.data);
            router.push('/');
        } catch (err: unknown) {
            console.error('Error during login:', err);
        
            let errorMessage = 'Login failed. Please try again.';
        
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    console.error('Response error data:', err.response.data);
                    errorMessage = err.response.data.message || 'Server responded with an error.';
                } else if (err.request) {
                    console.error('No response received:', err.request);
                    errorMessage = 'No response received from the server. Please check your network connection.';
                } else {
                    console.error('Error message:', err.message);
                    errorMessage = err.message;
                }
            } else if (err instanceof Error) {
                console.error('Error message:', err.message);
                errorMessage = err.message;
            }
        
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-classname"> {}
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
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText
                                id="email1"
                                type="text"
                                placeholder="Alamat Email atau Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: '1rem' }}
                            />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password
                                inputId="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
        </div>
    );
};

export default LoginPage;
