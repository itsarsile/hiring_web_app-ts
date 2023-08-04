import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
const opensans = Open_Sans({ subsets: ["latin"] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <div data-theme="corporate" className={opensans.className}>
      <SessionProvider session={pageProps.session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light'
          }}
        >
        <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </div>
  );
}


