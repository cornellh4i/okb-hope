import ProfProfileBox from '@/components/profProfile/ProfProfileBox';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../../firebase/fetchData';
import { IPsychiatrist } from '@/schema';

const ProfProfilePage = () => {
    const router = useRouter();
    const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
    const { psych_uid } = router.query;

    useEffect(() => {
        const fetchProfessional = async () => {
            if (psych_uid) {
                const data = await fetchProfessionalData(psych_uid as string);
                setProfessional(data);
            }
        };
        fetchProfessional();
    }, [psych_uid]);

    return (
        <div className="min-h-screen" style={{ backgroundColor: "rgba(247, 247, 245, 1)" }}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center gap-2 text-gray-500 mb-6 font-montserrat pl-1">
                    <span onClick={router.back} style={{ cursor: 'pointer' }}>
      Discover a professional
    </span>
                    <span>/</span>
                    <span className="text-black">
                        Dr. {professional?.firstName} {professional?.lastName}
                    </span>
                </div>
                <ProfProfileBox />
            </div>
        </div>
    );
};

export default ProfProfilePage;