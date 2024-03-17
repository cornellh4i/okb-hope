import EditPatientProfile from "@/components/EditPatientProfile";
import { useAuth } from "../../../../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      {user && <EditPatientProfile />}
    </>
  );
}
