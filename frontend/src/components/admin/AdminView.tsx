import AdminProfProfile from '@/components/profProfile/ProfProfile';
import { IPsychiatrist } from '@/schema';

interface ProfProfileProps {
    prof: IPsychiatrist;
}

const AdminView = ({psych_uid}, {prof}) => {
    return (
        <div>
            <AdminProfProfile 
                firstName={prof.firstName} 
                lastName={prof.lastName} 
            />
        </div>
    );
}
 
export default AdminView;