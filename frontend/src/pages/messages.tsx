import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ChatApp from '@/components/chatapp/ChatApp';
import { LoginPopup } from '@/components/LoginPopup';
import router from 'next/router';

const MessagesPage = () => {
  const { user, login } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    }
  }, [user]);

  const signUpWithGoogleAndRedirect = async (onClose: () => void) => {
    router.push('/questionnaire');
    setShowPopup(false);
    onClose();
  };

  const logInWithGoogleAndRedirect = async (onClose: () => void) => {
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
          {showPopup && (
            <LoginPopup
              onClose={() => setShowPopup(false)}
              logInWithGoogleAndRedirect={logInWithGoogleAndRedirect}
              signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect}

            />
          )}
        </>
      )}
    </>
  );
};

export default MessagesPage;
