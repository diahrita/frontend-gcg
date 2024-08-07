import { useState } from 'react';
import { cekAssessment } from '@/app/api/assesment/cekAssessment';
import { Messages } from '@/app/hendlererror/message/messages';
import { useRouter } from 'next/navigation';
import { LabelAssessment } from '@/types/assessment';

const useInputBankSoalLogic = () => {
    const [codeAlat, setCodeAlat] = useState<string>('');
    const [nipp, setNipp] = useState<string>('');
    const [data, setData] = useState<LabelAssessment[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = async () => {
        if (!codeAlat || !nipp) {
            setError('Kode Alat dan NIPP harus diisi');
            return;
        }

        setError(null);
        setLoading(true);
        try {
            const result = await cekAssessment(codeAlat, nipp);
            if (result.successCode === 200 && result.data) {
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

    return {
        codeAlat,
        setCodeAlat,
        nipp,
        setNipp,
        data,
        error,
        loading,
        fetchData
    };
};

export default useInputBankSoalLogic;
