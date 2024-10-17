import AdminView from '@/components/admin/AdminView';
import { IPsychiatrist } from '@/schema';

const Bookings = ({psych_uid}) => {
    return (
      <div className={`flex justify-center`}>
        <AdminView psych_uid={psych_uid} />
      </div>
    );
}
  
  export default Bookings