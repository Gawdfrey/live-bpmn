import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Auth } from "components/Auth";
import type { NextComponentType } from "next"; //Import Component type
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "@next/font/local";
import { trpc } from "utils/trpc";
import Header from "components/Header";
import Footer from "components/Footer";
import "reactflow/dist/style.css";

const monaSans = localFont({
  src: "./Mona-Sans.woff2",
  variable: "--font-mona-sans",
});

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
  session: Session;
};

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <div
          className={`${monaSans.variable} font-sans flex flex-col h-screen`}
        >
          <Header />
          <main className="flex-grow">
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
          <Footer />
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(App);
