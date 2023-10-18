import ProfProfile from '@/components/profProfile/ProfProfile';
import { IPsychiatrist } from '@/schema';

const Bookings = () => {

    return (
        <div className={`flex justify-center pt-10`}>
            <ProfProfile firstName='Erica' lastName='Jameson' />
        </div>
    );
}

export default Bookings