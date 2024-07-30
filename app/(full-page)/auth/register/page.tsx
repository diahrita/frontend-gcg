/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

const RegisterPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const [value, setValue] = useState<string>('');

    return (
        <div className={containerClassName}>
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
                            <span className="text-600 font-medium">Silahkan register terlebih dahulu!</span>
                        </div>

                        <div>
                            <label htmlFor="nama" className="block text-900 text-xl font-medium mb-2">
                                Nama
                            </label>
                            <InputText id="nama" type="text" placeholder="Nama" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email" keyfilter="email" type="text" placeholder="Alamat Email" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password
                                inputId="password1"
                                value={value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            />

                            <div className="flex align-items-center justify-content-between mb-1 gap-5"></div>
                            <Button label="Register" className="w-full p-3 text-xl" onClick={() => router.push('/')}></Button>

                            <div className="text-center mb-5">
                                <div className="text-600 font-medium mb-3" style={{ paddingTop: '1rem' }}>
                                    Sudah Punya Akun?{' '}
                                    <Link href="/auth/login" className="underline text-blue-600">
                                        Masuk
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-5 w-6rem flex-shrink-0" />
            </div>
        </div>
    );
};

export default RegisterPage;
