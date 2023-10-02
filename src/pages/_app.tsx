import type { AppProps } from "next/app";
import Head from "next/head";

import { globalStyles } from "../styles/global";

import { useContext } from "react";

import { Header } from "../components/Header";
import { Container } from "../styles/pages/app";

import { CartContext, CartContextProvider } from "@/contexts/CartContext";
import { LoadingComponent } from "@/components/LoadingComponent";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { isCreatingCheckoutSection } = useContext(CartContext);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <CartContextProvider>
        {isCreatingCheckoutSection && <LoadingComponent />}

        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </CartContextProvider>
    </>
  );
}
