import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import Layout from '@/components/Layout';

function getLayout(Component) {
  return Component.noNavbar ? (pageProps) => <>{pageProps.children}</> : Layout;
}

export default function App({ Component, pageProps }: AppProps) {
  const LayoutComponent = getLayout(Component);

  return (
    <AuthProvider>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </AuthProvider>
  );
}
