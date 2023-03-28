import Head from 'next/head';

import QuestionnaireCarousel from '@/components/QuestionnaireCarousel';

export default function Home() {
  return (
    <div className="mx-auto">
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className='ml-10'>
        <QuestionnaireCarousel />
      </div>

    </div>
  );
}

