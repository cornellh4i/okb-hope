import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '@/components/dashboard/Dashboard';

const MyPage = () => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <Dashboard />}
      <main></main>
    </>
  );
};

export default MyPage;
