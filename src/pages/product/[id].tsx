import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ImageLoadingContainer,
  LoadingContainer,
  ProductContainer,
  ProductDetails,
  ProductLoadingDetails,
} from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Stripe from "stripe";
import Head from "next/head";

import { LoadingComponent } from "@/components/LoadingComponent";
import { CartContext } from "@/contexts/CartContext";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceFormatted: string;
    description: string;
    defaultPriceId: string;
    quantity: number;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_OgXjsbrYTjlWfY" } }],
    fallback: true,
  };
};

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [isCreatingCheckoutSection, setIsCreatingCheckoutSection] =
    useState(false);

  //const router = useRouter();

  async function handleBuyProduct() {
    addProductToCart(product);

    // try {
    //   setIsCreatingCheckoutSection(true);

    //   const response = await axios.post("/api/checkout", {
    //     priceId: product.defaultPriceId,
    //   });

    //   const { checkoutUrl } = response.data;

    //   // router.push('/checkout');
    //   window.location.href = checkoutUrl;
    // } catch {
    //   setIsCreatingCheckoutSection(false);

    //   // Conectar com alguma ferramenta de observabilidade (Datadog / Sentry)
    //   alert("Falha ao redirecionar ao checkout");
    // }
  }

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Product | Ignite Shop</title>
        </Head>

        <LoadingContainer>
          <ImageLoadingContainer></ImageLoadingContainer>

          <ProductLoadingDetails>
            <div className="title"></div>

            <div className="price"></div>

            <div className="description"></div>

            <div className="button"></div>
          </ProductLoadingDetails>
        </LoadingContainer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      {isCreatingCheckoutSection && <LoadingComponent />}

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>
          <p>{product.description}</p>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSection}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    throw new Error("The product with this id was not found");
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  if (!price.unit_amount) {
    throw new Error("The price of this product is not available");
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        priceFormatted: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
