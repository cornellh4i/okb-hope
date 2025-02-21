import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../../calendly/AuthService';
import { useRef } from 'react';

const CalendlyAuth = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'processing' | 'error' | 'success'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const codeProcessed = useRef(false);

  useEffect(() => {
    const handleAuthorizationCode = async () => {
      const { code } = router.query;
      
      if (!code) {
        if (!codeProcessed.current) {
          codeProcessed.current = true;
          window.location.href = AuthService.getAuthorizationUrl();
        }
        return;
      }
  
      if (codeProcessed.current) {
        return;
      }
  
      try {
        codeProcessed.current = true;
        const token = await AuthService.exchangeCodeForToken(code as string);
        AuthService.storeAuthToken(token);
        setStatus('success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to complete authorization');
      }
    };
  
    if (router.isReady) {
      handleAuthorizationCode();
    }
  }, [router.isReady, router.query, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === 'processing' && (
        <div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4">Completing authorization...</p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <p className="text-red-500">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      )}

      {status === 'success' && (
        <div>
          <p className="text-green-500">Authorization successful!</p>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}

export default CalendlyAuth;