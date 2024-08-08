
import { getDetailByHeaderId } from '@/app/api/assesment/detailAssessments';
import { Messages } from '@/app/hendlererror/message/messages';
import { Demo } from '@/types';
import { AssessmentItem } from '@/types/assessment';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

export const DetailAssessment = () => {
    const [data, setData] = useState<AssessmentItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const title = sessionStorage.getItem('title');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const headerIdStr = sessionStorage.getItem('header_id');

                if (!headerIdStr) {
                    setLoading(false);
                    return;
                }

                const headerId = Number(headerIdStr);

                if (isNaN(headerId)) {
                    setError('Invalid header ID');
                    setLoading(false);
                    return;
                }

                const result = await getDetailByHeaderId(headerId, 'RTG-22', '8606120200');
                if (result.successCode === 200 && result.data) {
                    setData(result.data.data);
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

        fetchData();
    }, []);

    const filteredData = (data && Array.isArray(data) ? data : []).filter(item =>
        item.pertanyaan !== "-" ||
        item.jawaban !== "-" ||
        item.grup !== "-" ||
        item.group_position !== "-"
    );

    const dataWithDisplayId = filteredData.map((item, index) => ({
        ...item,
        id: index + 1
    }));

    const jumlahSoal = dataWithDisplayId.length;
    sessionStorage.setItem('jumlahSoal', JSON.stringify(jumlahSoal));
    console.log('Jumlah soal:', jumlahSoal);

    const [editSoalDialog, setEditSoalDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [soals, setSoals] = useState<Demo.Soal[] | null>(null);
    const [soalDialog, setSoalDialog] = useState(false);
    const [deleteSoalDialog, setDeleteSoalDialog] = useState(false);
    const [soal, setSoal] = useState<Demo.Soal>({ id: 0, pertanyaan: '', jumlah: 0, jawaban: 0, grup: '', created_at: '', modified_at: '', show: 0 });
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);

    const openNew = () => {
        setSoal({ id: 0, pertanyaan: '', jumlah: 0, jawaban: 0, grup: '', created_at: '', modified_at: '', show: 0 });
        setSubmitted(false);
        setSoalDialog(true);
        setIsEditMode(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSoalDialog(false);
    };

    const hideDeleteSoalDialog = () => {
        setDeleteSoalDialog(false);
    };

    const saveSoal = () => {
        setSubmitted(true);

        if (soal.pertanyaan && soal.jawaban) {
            // Save logic here
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Pertanyaan dan Jawaban harus diisi',
                life: 3000
            });
        }
    };

    const editSoal = (soal: Demo.Soal) => {
        setSoal({ ...soal });
        setSoalDialog(true);
        setIsEditMode(true);
    };

    const confirmDeleteSoal = (soal: Demo.Soal) => {
        setSoal(soal);
        setDeleteSoalDialog(true);
    };

    const deleteSoal = () => {
        const updatedSoals = (soals || [])?.filter(val => val.id !== soal.id);
        setSoals(updatedSoals);
        setDeleteSoalDialog(false);
        setSoal({ id: 0, pertanyaan: '', jumlah: 0, jawaban: 0, grup: '', created_at: '', modified_at: '', show: 0 });
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Soal Deleted',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = e.target.value;
        setSoal(prev => ({ ...prev, [name]: val }));
    };

    return {
        dataWithDisplayId,
        loading,
        error,
        title,
        editSoalDialog,
        isEditMode,
        soals,
        soalDialog,
        deleteSoalDialog,
        soal,
        submitted,
        globalFilter,
        toast,
        openNew,
        hideDialog,
        hideDeleteSoalDialog,
        saveSoal,
        editSoal,
        confirmDeleteSoal,
        deleteSoal,
        onInputChange,
        setGlobalFilter
    };
};
