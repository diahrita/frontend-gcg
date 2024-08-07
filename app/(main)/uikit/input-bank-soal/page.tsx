'use client';
import { cekAssessment } from '@/app/api/assesment/cekAssessment';
import { Messages } from '@/app/hendlererror/message/messages';
import { LabelAssessment } from '@/types/assessment';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import './style.css';

const InputBankSoal = () => {
    const [codeAlat, setCodeAlat] = useState<string>('');
    const [nipp, setNipp] = useState<string>('');
  
    const [data, setData] = useState<LabelAssessment[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = async () => {
        // console.log('Fetching data...');
        if (!codeAlat || !nipp) {
            setError('Kode Alat dan NIPP harus diisi');
            return;
            
        }
        setError(null);
        setLoading(true);
        try {
            const result = await cekAssessment(codeAlat, nipp);
            if (result.successCode === 200 && result.data) {
                // console.log('Data received from API:', result.data);
                setData(result.data);
                sessionStorage.setItem('codeAlat', codeAlat);
                sessionStorage.setItem('nipp', nipp);
                router.push('/uikit/bank-soal');
            } else {
                const storedError = sessionStorage.getItem(Messages.ERROR);
                setError(storedError || Messages.GENERIC_ERROR);
            }
        } catch (err) {
            const storedError = sessionStorage.getItem(Messages.ERROR);
            setError(storedError || Messages.GENERIC_ERROR);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    {error && <p className="error-message">{error}</p>}
                    <h5>Silahkan Masukkan Kode Alat dan NIPP</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="code_alat">Kode Alat</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-wrench"></i>
                                </span>
                                <InputText 
                                    id="code_alat" 
                                    type="text" 
                                    value={codeAlat} 
                                    onChange={(e) => setCodeAlat(e.target.value)} 
                                    className={`w-full ${error && !codeAlat ? 'p-invalid' : ''}`} 
                                    placeholder={error && !codeAlat ? 'Kode Alat harus diisi' : 'Masukkan Kode Alat'}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="nipp">NIPP</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText 
                                    id="nipp" 
                                    keyfilter="int" 
                                    value={nipp} 
                                    onChange={(e) => setNipp(e.target.value)} 
                                    className={`w-full ${error && !nipp ? 'p-invalid' : ''}`} 
                                    placeholder={error && !nipp ? 'NIPP harus diisi' : 'Masukkan NIPP'}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <Button
                            label={loading ? 'Loading...' : 'Submit'} 
                            className={`w-full mt-2 ${loading ? 'p-button-secondary' : ''}`} 
                            onClick={fetchData}
                            disabled={loading}
                        />
                       

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputBankSoal;