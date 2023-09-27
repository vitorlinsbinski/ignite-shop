import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { stripe } from "../lib/stripe";

import { HomeContainer, Product } from "../styles/pages/home";

import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt="" width={520} height={480} />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeContainer>
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
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
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
