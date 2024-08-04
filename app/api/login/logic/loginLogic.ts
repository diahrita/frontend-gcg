import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/api/login/loginApi';
import { Messages } from '@/app/hendlererror/message/messages';

export const useLoginLogic = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

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

        const storedError = sessionStorage.getItem('error');
        if (storedError) {
            setError(storedError);
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
            const expirationTime = Date.now() + 6 * 60 * 60 * 1000; 
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('expirationTime', expirationTime.toString());
        } catch (err: any) {
            setError(err.message);
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

    return {
        username,
        password,
        loading,
        error,
        usernameError,
        passwordError,
        handleLogin,
        handleUsernameChange,
        handlePasswordChange,
    };
};
