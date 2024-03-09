import Head from 'next/head';
import { useState, useEffect } from 'react';
import ChatApp from '@/components/chatapp/ChatApp';
import { LoginPopup } from '@/components/LoginPopup';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/router';

const MessagesPage = () => {
  const { user, login } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  console.log(user)

  const router = useRouter();
  const { userId } = router.query;
  console.log(userId)

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    }
  }, [user]);

  const logInWithGoogleAndRedirect = async (onClose) => {
    await login();
    onClose();
  };

  const signUpWithGoogleAndRedirect = async (onClose: () => void) => {
    router.push('/psych_questionnaire'); // Moved this line before the closing of the popup
    setShowPopup(false);
    onClose();
  };

  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Messages page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script dangerouslySetInnerHTML={{ __html: 'window.scrollTo(0, 0);' }} /> */}
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
