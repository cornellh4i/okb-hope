import AdminProfProfile from '../adminProfProfile/AdminProfProfile';
import { IPsychiatrist } from '@/schema';

const AdminView = ({professional}) => {
    return (
        <div>
            <h1>
                Dr. {professional.firstName} {professional.lastName}
            </h1>
            <AdminProfProfile 
                firstName={professional.firstName} 
                lastName={professional.lastName} 
            />
        </div>
    );
}
 
export default AdminView;