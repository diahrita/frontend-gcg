import { cekAssessment } from '@/app/api/assesment/cekAssessment';
import { Messages } from '@/app/hendlererror/message/messages';
import { Demo } from '@/types';
import { LabelAndGroup } from '@/types/assessment';
import { useEffect, useRef, useState } from 'react';

const useBankSoalLogic = () => {
    const [data, setData] = useState<LabelAndGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [banksoals, setBankSoals] = useState<Demo.BankSoal[]>([]);
    const [banksoalDialog, setBankSoalDialog] = useState(false);
    const [deleteBankSoalDialog, setDeleteSoalDialog] = useState(false);
    const [banksoal, setBankSoal] = useState<Demo.BankSoal>({ header_id: 0, label: '', grup: '' });
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    const handleLinkClick = (headerId: number, title: string) => {
        sessionStorage.setItem('header_id', headerId.toString());
        sessionStorage.setItem('title', title);
    };

    const fetchLabelsAndGroups = async () => {
        setLoading(true);
        try {
            const code_alat = sessionStorage.getItem('codeAlat');
            const nipp = sessionStorage.getItem('nipp');
            if (!code_alat || !nipp) {
                setLoading(false);
                return;
            }
            const result = await cekAssessment(code_alat, nipp);
            if (result.successCode === 200 && result.data) {
                setData(result.data);
                // console.log("Ini data", result.data);
            } else {
                const storedError = sessionStorage.getItem(Messages.ERROR);
                setError(storedError || Messages.GENERIC_ERROR);
            }
        } catch (error) {
            const storedError = sessionStorage.getItem(Messages.ERROR);
            setError(storedError || Messages.GENERIC_ERROR);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabelsAndGroups();
    }, []);

    const openNew = () => {
        setBankSoal({ header_id: 0, label: '', grup: '' });
        setSubmitted(false);
        setBankSoalDialog(true);
        setIsEditMode(false);
    };

    const hideDialog = () => {
        setBankSoalDialog(false);
    };

    const saveBankSoal = () => {
        setSubmitted(true);

        if (banksoal.label && banksoal.label.trim() && banksoal.grup && banksoal.grup.trim()) {
            let _banksoals = [...banksoals];
            if (isEditMode) {
                const index = _banksoals.findIndex(bs => bs.header_id === banksoal.header_id);
                _banksoals[index] = banksoal;
            } else {
                banksoal.header_id = banksoals.length + 1;
                _banksoals.push(banksoal);
            }

            setBankSoals(_banksoals);
            setBankSoalDialog(false);
            setBankSoal({ header_id: 0, label: '', grup: '' });
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Bank Soal Saved', life: 3000 });
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setBankSoal(prevState => ({ ...prevState, [name]: val }));
    };



    return {
        data,
        loading,
        error,
        isEditMode,
        banksoals,
        banksoalDialog,
        deleteBankSoalDialog,
        banksoal,
        submitted,
        globalFilter,
        toast,
        dt,
        setGlobalFilter,
        handleLinkClick,
        openNew,
        hideDialog,
        saveBankSoal,
        onInputChange,
    };
};

export default useBankSoalLogic;
