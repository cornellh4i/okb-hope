import PsychiatristDashboard from '@/components/psychDashboard/PsychiatristDashboard';
import { useAuth } from '../../../../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {user && <PsychiatristDashboard />}
    </>
  );
}