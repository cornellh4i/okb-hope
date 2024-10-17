import ProfProfile from '@/components/profProfile/ProfProfile';
import { IPsychiatrist } from '@/schema';

const AdminView = ({psych_uid}) => {
    return (
        <div>
            <ProfProfile />
        </div>
    );
}
 
export default AdminView;