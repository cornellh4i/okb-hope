import { useAuth } from '../../../../contexts/AuthContext';
import Dashboard from '@/components/dashboard/Dashboard';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <Dashboard />}
    </>
  );
};

export default App;