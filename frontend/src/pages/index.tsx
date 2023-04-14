import Head from 'next/head';
import React from 'react';
import Dashboard from '@/components/Dashboard';


export default function Home() {
  return (
    <div className="mx-auto">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Dashboard />
    </div>
  );
}

