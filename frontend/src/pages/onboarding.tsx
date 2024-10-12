import QuestionnaireCarousel from "@/components/onboarding/QuestionnaireCarousel";
import { useState, useEffect } from 'react';

const Onboarding = ()  => {
    // Step 3: Define a state to store the fetched quote
  const [quote, setQuote] = useState('');

  // Step 4: Define the fetchQuote function using async/await
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/quotes/random');
      const data = await response.json();
      setQuote(data.content);  // Set the fetched quote
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  // Step 5: Use useEffect to fetch the quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []); // Empty dependency array means this runs once when the component loads

  return (
    <div className='ml-10'>
      <QuestionnaireCarousel />
      <div style={{ marginTop: '20px' }}>
        {/* Display the fetched quote */}
        <blockquote>{quote}</blockquote>
      </div>
    </div>
  );
};

export default Onboarding;