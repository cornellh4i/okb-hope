import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/index';
import React from 'react';
import Appt from './appointment';
import ApptDetails from '../components/ApptDetails'

import { AuthProvider } from '../../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <BrowserRouter>
    //   <Route path="/" element={<Home />} />
    // </BrowserRouter>
    // <BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>

          <Route path="home" index element={<Home />} />
          {/* <Route path="appointment" element={<Appt />} />
        <Route path="heroes/:id" element={<Appt />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>

    // </BrowserRouter >
    // <AuthProvider>
    //   <Component {...pageProps} />
    // </AuthProvider>
  );
}

