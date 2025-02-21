import { useAuth } from '../../contexts/AuthContext';
import CalendlyAuth from '@/components/CalendlyAuth';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <CalendlyAuth />}
    </>
  );
};

export default App;