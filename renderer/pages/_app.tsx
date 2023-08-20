import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
