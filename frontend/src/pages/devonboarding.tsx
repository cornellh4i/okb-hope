import React, { useState, useEffect } from 'react';
interface Quote {
  text: string;
  author: string;
}
const OnboardingPage: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchQuote();
  }, []);
  // TODO: Implement the fetchQuote function
  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement the API call to the Quote API here
      // Use fetch or axios to make a GET request to a Quote API
      // Endpoint: https://api.quotable.io/quotes/random
      // Once you have the response, update the state with the quote
      // setQuote({ text: 'Quote text from API', author: 'Author name from API' });
        const response = await fetch('https://api.quotable.io/random');
    
        if (!response.ok) {
        throw new Error('Failed to fetch the quote');
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Update the state with the fetched quote
        setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to fetch quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Welcome to Quote of the Day</h1>
            {isLoading ? (
              <p>Loading quote...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : quote ? (
              <div className="mb-6">
                <p className="text-lg italic">"{quote.text}"</p>
                <p className="text-right mt-2">- {quote.author}</p>
              </div>
            ) : null}
            <button
              onClick={fetchQuote}
              className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Fetching...' : 'Get New Quote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;