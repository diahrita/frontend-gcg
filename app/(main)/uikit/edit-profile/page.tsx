'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';

interface DropdownItem {
    name: string;
    code: string;
}

const FormLayoutDemo = () => {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Option 1', code: 'Option 1' },
            { name: 'Option 2', code: 'Option 2' },
            { name: 'Option 3', code: 'Option 3' }
        ],
        []
    );
    const toast = useRef<Toast | null>(null);
    const onUpload = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
            life: 3000
        });
    };
    const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Edit Profile</h3>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12">
                            <div className="field">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">No Telepon</label>
                                <InputText id="phone" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="currentPassword">Ubah Password</label>
                                <Password className="w-full mb-3" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} feedback={false} toggleMask />
                                <Password className="w-full mb-3" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} toggleMask />
                                <Password className="w-full" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} toggleMask />
                            </div>
                        </div>
                        <div className="field col-12">
                            <Button label="Submit"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
