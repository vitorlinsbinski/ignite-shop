import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { SwiperItem } from "@/components/SwiperItem";
import { SwiperSkeleton } from "@/components/SwiperItemSkeleton";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { stripe } from "../lib/stripe";

import { HomeContainer } from "../styles/pages/home";

import Stripe from "stripe";
import { useEffect, useState } from "react";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceFormatted: string;
    description: string;
    defaultPriceId: string;
    quantity: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRefSkeleton] = useKeenSlider({
    breakpoints: {
      "(max-width: 991px)": {
        slides: { perView: 2, spacing: 30 },
      },
      "(max-width: 760px)": {
        slides: { perView: 1.2, spacing: 20 },
      },
    },
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 991px)": {
        slides: { perView: 2, spacing: 30 },
      },
      "(max-width: 760px)": {
        slides: { perView: 1.2, spacing: 20 },
      },
    },
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  function getRandomDelay() {
    const minDelay = 100;
    const maxDelay = 1000;

    const randomFraction = Math.random();
    const randomDelay = minDelay + randomFraction * (maxDelay - minDelay);

    return randomDelay;
  }

  useEffect(() => {
    const randomDelay = getRandomDelay();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      {isLoading ? (
        <HomeContainer ref={sliderRefSkeleton} className="keen-slider">
          <SwiperSkeleton />
          <SwiperSkeleton />
          <SwiperSkeleton />
          <SwiperSkeleton />
          <SwiperSkeleton />
        </HomeContainer>
      ) : (
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <SwiperItem product={product} key={product.id} />
          ))}
        </HomeContainer>
      )}
    </>
  );
}

// Nós fazemos a busca pelo lado do servidor apenas de informações que são cruciais aparecem em tela assim que a página for carregada, facilitando a indexação do conteúdo nos bots dos browsers
// Um dos benefícios de fazer chamada a APIs em Server Side é que ela vai estar escondida do usuário final
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    if (price.unit_amount) {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        priceFormatted: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id,
      };
    } else {
      throw new Error("The price of this product is not available");
    }
  });

  return {
    props: {
      products,
    },

    revalidate: 60 * 60 * 2,
  };
};

// Chave pública da API: ela não permite buscar informações dentro de um banco de dados. Ela permite, por exemplo, fazer checkouts
// Chave secreta: dá acesso aos dados de uma API ou banco de dados

// File-system Routing
// Roteamento baseado em arquivos físicos
