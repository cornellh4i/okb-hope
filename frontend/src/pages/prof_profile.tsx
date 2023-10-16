import ProfProfile from '@/components/profProfile/ProfProfile';
import { IPsychiatrist } from '@/schema';

const Bookings = () => {

    const dummy: IPsychiatrist = {
        id: 1,
        first_name: "Erica",
        last_name: "Jameson",
        title: "Dr",
        profile_pic: null,
        availability: [],
        gender: 1,
        location: "jeojfd",
        language: [],
        specialty: [],
        description: ""
    }

    return (
        <div>
            <ProfProfile psychiatrist={dummy} />
        </div>
    );
}

export default Bookings