import { fetchBusinessPartnerData } from '@/app/api/partner/partnerData';
import { Messages } from '@/app/hendlererror/message/messages';
import { DataPartner } from '@/types/partner';
import { useEffect, useState } from 'react';

export const useDataAdminLogic = () => {
    const [data, setData] = useState<DataPartner[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchBusinessPartnerData(page, limit);
                if (result.successCode === 200 && result.data) {
                    setData(result.data);
                    sessionStorage.removeItem(Messages.ERROR);
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
    }, [page, limit]);

    const handlePageChange = (event: { first: number; rows: number; }) => {
        const newPage = Math.floor(event.first / event.rows) + 1;
        setPage(newPage);
        setLimit(event.rows);
        //setRowsPerPage(await event);
    };

    // Filter out partners with fields equal to "-"
    const filteredData = (data && Array.isArray(data) ? data : []).filter(partner =>
        partner.short_name !== "-" ||
        partner.email !== "-" ||
        partner.phone !== "-" ||
        partner.add_street1 !== "-" ||
        partner.postal_code !== "-" ||
        partner.tax_no !== "-"
    );

    // Add display ID to the filtered data
    const dataWithDisplayId = filteredData.map((partner, index) => ({
        ...partner,
        id: index + 1
    }));

    return { data, loading, error, dataWithDisplayId, handlePageChange };
};
