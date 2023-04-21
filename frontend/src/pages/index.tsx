import Head from 'next/head'
import { Inter } from 'next/font/google'
import PsychiatristProfile from "./pro_profile1"

export default function Home() {
  return (
    <div className="mx-auto">
      <Head>
        <PsychiatristProfile />
      </Head>
    </div>
  );
}

