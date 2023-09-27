import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ImageLoadingContainer,
  LoadingContainer,
  ProductContainer,
  ProductDetails,
  ProductLoadingDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
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

  if (isFallback) {
    return (
      <LoadingContainer>
        <ImageLoadingContainer></ImageLoadingContainer>

        <ProductLoadingDetails>
          <div className="title"></div>

          <div className="price"></div>

          <div className="description"></div>

          <div className="button"></div>
        </ProductLoadingDetails>
      </LoadingContainer>
    );
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
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
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
