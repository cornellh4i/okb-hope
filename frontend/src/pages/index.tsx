import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import VideoChatPage from './video-chat';

// const inter = Inter({ subsets: ['latin'] })

const MyPage = () => {
  return (
    <div>
      <VideoChatPage />
    </div>
  );
};

export default MyPage;