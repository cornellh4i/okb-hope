import ProfProfileBox from '@/components/profProfile/ProfProfileBox';
import { IPsychiatrist } from '@/schema';

const Bookings = () => {

    return (
        <div className={`flex justify-center`} style={{ backgroundColor: "rgba(247, 247, 245, 1)" }}>
            <ProfProfileBox />
        </div>
    );
}

export default Bookings