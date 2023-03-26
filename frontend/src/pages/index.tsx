import Head from 'next/head';
import React from 'react';

import QuestionCard from '@/components/QuestionCard';
import QuestionnaireCarousel from '@/components/QuestionnaireCarousel';
import NavigationButtons from '@/components/NavigationButtons';
import Dashboard from '@/components/Dashboard';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Dashboard></Dashboard>
      {/* <QuestionCard
        question="How are you feeling about your mental health?"
        option1='Feeling great!'
        option2='Could be better.'
        option3="I'm not really sure"
        option4="I'm not doing too well"
        option5="I need some help"
      /> */}
    </div>
  );
}

