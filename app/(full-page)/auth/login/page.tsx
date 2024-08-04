'use client';
import { useLoginLogic } from '@/app/api/login/logic/loginLogic';
import { Messages } from '@/app/hendlererror/message/messages';
import Head from 'next/head';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './styles.css';

const LoginPage = () => {
    const {
        username,
        password,
        loading,
        error,
        usernameError,
        passwordError,
        handleLogin,
        handleUsernameChange,
        handlePasswordChange,
    } = useLoginLogic();

    return (
        <>
         <Head>
                <title>SIMGO</title>
                <meta name="description" content="Sistem Informasi Manajemen Good Corporate Governance" />
            </Head>
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
        </>
    );
};

export default LoginPage;
