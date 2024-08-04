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
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const storedError = sessionStorage.getItem(Messages.ERROR);

            if (storedError) {
                setError(storedError);
                setLoading(false);
                return;
            }

            try {
                const result = await fetchBusinessPartnerData(page, limit);
                if (result.status === 200 && result.data) {
                    setData(result.data);
                    setHasData(true); 
                    sessionStorage.removeItem(Messages.ERROR);
                } else {
                    setError(storedError);
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
        const initialInterval = setTimeout(() => {
            const errorCheckInterval = setInterval(() => {
                const storedError = sessionStorage.getItem(Messages.ERROR);
                if (storedError && storedError !== error) {
                    setError(storedError);
                }
                if (hasData) {
                    clearInterval(errorCheckInterval);
                    sessionStorage.removeItem(Messages.ERROR);
                }
            }, 15000); // 15 seconds
            return () => clearInterval(errorCheckInterval);
        }, 500 ); 
        return () => clearTimeout(initialInterval);
    }, [page, limit, error, hasData]);

    const handlePageChange = (event: { first: number; rows: number; }) => {
        const newPage = Math.floor(event.first / event.rows) + 1;
        setPage(newPage);
        setLimit(event.rows);
    };

    const filteredData = (data && Array.isArray(data) ? data : []).filter(partner =>
        partner.short_name !== "-" ||
        partner.email !== "-" ||
        partner.phone !== "-" ||
        partner.add_street1 !== "-" ||
        partner.postal_code !== "-" ||
        partner.tax_no !== "-"
    );

    const dataWithDisplayId = filteredData.map((partner, index) => ({
        ...partner,
        id: index + 1
    }));

    return { dataWithDisplayId, loading, error, handlePageChange };
};