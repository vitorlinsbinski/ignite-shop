import type { AppProps } from "next/app";
import Head from "next/head";

import { globalStyles } from "../styles/global";

import { Header } from "../components/Header";
import { Container } from "../styles/pages/app";

import { CartContextProvider } from "@/contexts/CartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}
