import React, { useState, useEffect } from 'react';
const fetch = require('node-fetch');

const App = () => {
  const [requestStatus, setRequestStatus] = useState('idle');
  const [error, setError] = useState(null);
  const CLIENT_ID = "Of2aOsvM0A-Nms1YL1N1qI_7wWn7V6NWY8JacIR7wZ4";
  const CLIENT_SECRET = "6zvhdXZrEUxlRcUbQHgy_DtaeLUxtI1vNOn1yBX6Tos"
  const REDIRECT_URI = "http://localhost:3000/calendly_test";
  const GET_AUTH_CODE = `https://auth.calendly.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  const TOKEN_REQUEST_HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${CLIENT_ID}${CLIENT_SECRET}`
  };
  const [code, setCode] = useState('');
  const TOKEN_REQUEST_BODY = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
  };

  useEffect(() => {
    // Get URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    
    if (codeParam) {
      console.log('Found code:', codeParam);
      setCode(codeParam);
    } else {
      console.log('No code found in URL');
    }
  }, []);

  const handleRedirect = async () => {
    setRequestStatus('loading');
    setError(null);

    try {
      window.location.href = GET_AUTH_CODE;
      setRequestStatus('success');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToken = async () => {

    const encodedBody = new URLSearchParams(TOKEN_REQUEST_BODY);

    const options = {
      method: 'POST',
      headers: TOKEN_REQUEST_HEADERS,
      body: encodedBody
    };

    // try {
    //   new URL("https://auth.calendly.com/oauth/token"); // Will throw if URL is invalid
    //   console.log('URL is valid');
    // } catch (error) {
    //   console.error('Invalid URL:', error);
    // }

    try {
      const response = await fetch("https://auth.calendly.com/oauth/token", options);
      console.log('Response:', response);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Calendly Test
        </h1>

        <button 
          onClick={handleRedirect}
          disabled={requestStatus === 'loading'}
          className={`
            px-4 py-2 rounded-md font-medium
            ${requestStatus === 'loading' 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
          `}
        >
          {requestStatus === 'loading' ? 'Redirecting...' : 'Redirect to Example'}
        </button>

        <button 
          onClick={handleToken}
          disabled={requestStatus === 'loading'}
          className={`
            px-4 py-2 rounded-md font-medium
            ${requestStatus === 'loading' 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
          `}
        >
          {requestStatus === 'loading' ? 'Requesting token...' : 'Request Token'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
            Error: {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;