import Head from 'next/head';
import { useState, useEffect } from 'react';
import ChatApp from '@/components/chatapp/ChatApp';
import { LoginPopup } from '@/components/LoginPopup';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

const MessagesPage = () => {
  const { user, login } = useAuth();
  console.log(user)

  const router = useRouter();
  const { userId } = router.query;
  console.log(userId)

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowLoginPopup(true);
    }
  }, [user]);

  const signInWithGoogleAndRedirect = async (onClose) => {
    await login();
    onClose();
  };

  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Messages page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? (
        <ChatApp />
      ) : (
        <>
          {showLoginPopup && (
            <LoginPopup
              onClose={() => setShowLoginPopup(false)}
              signInWithGoogleAndRedirect={signInWithGoogleAndRedirect}
            />
          )}
        </>
      )}
    </>
  );
};

export default MessagesPage;
