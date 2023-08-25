import EditPatientProfile from "@/components/patient_profile/EditPatientProfile";
import Navbar from '../components/navbar/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <EditPatientProfile />
    </div>
  );
}
