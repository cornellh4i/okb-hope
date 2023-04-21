import Head from 'next/head'
import { Inter } from 'next/font/google'
import PsychiatristProfile from "../pages/pro_profile"

export default function Home() {
  return (
    <div className="mx-auto">
      <Head>
        <PsychiatristProfile /> 
      </Head>
    </div>
  );
}

