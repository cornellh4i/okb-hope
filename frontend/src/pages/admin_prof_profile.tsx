import AdminProfProfile from '@/components/adminProfProfile/AdminProfProfile';
import { IPsychiatrist } from '@/schema';

const Bookings = () => {

  return (
    <div className={`flex justify-center pt-10`}>
      <AdminProfProfile firstName='Erica' lastName='Jameson' />
    </div>
  );
}

export default Bookings