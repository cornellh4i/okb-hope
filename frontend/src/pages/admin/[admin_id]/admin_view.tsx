import AdminView from '@/components/admin/AdminView';
import { IPsychiatrist } from '@/schema';

interface AdminViewProp {
    professional: IPsychiatrist;
}

const Bookings = ({professional}: AdminViewProp) => {
    return (
        <div className={`flex justify-center`}>
            <AdminView professional={professional} />
        </div>
    );
}
 
export default Bookings;