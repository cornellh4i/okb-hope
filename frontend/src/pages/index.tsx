import Head from 'next/head';
import React from 'react';
import Dashboard from '@/components/Dashboard';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Dashboard></Dashboard>

    </div>
  );
}

