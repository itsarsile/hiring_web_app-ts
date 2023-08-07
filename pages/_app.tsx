import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { RouterTransition } from "@/components/RouterTransition";
import { Notifications } from '@mantine/notifications'
const opensans = Open_Sans({ subsets: ["latin"] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div data-theme="corporate" className={opensans.className}>
      <SessionProvider session={pageProps.session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <RouterTransition />
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </div>
  );
}
