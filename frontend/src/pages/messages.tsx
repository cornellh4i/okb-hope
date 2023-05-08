import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ChatApp from '@/components/ChatApp/ChatApp';
import { LoginPopup } from '@/components/LoginPopup';

const MessagesPage = () => {
  const { currentUser, login } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowLoginPopup(true);
    }
  }, [currentUser]);

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
      {currentUser ? (
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
