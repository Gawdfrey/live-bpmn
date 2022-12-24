import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Auth } from "components/Auth";
import type { NextComponentType } from "next"; //Import Component type
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "@next/font/local";

const monaSans = localFont({
  src: "./Mona-Sans.woff2",
  variable: "--font-mona-sans",
});

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
  sessiob: Session;
};

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <main className={`${monaSans.variable} font-sans`}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </SessionProvider>
    </QueryClientProvider>
  );
}
