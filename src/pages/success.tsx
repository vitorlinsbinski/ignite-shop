import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductsContainer,
  SuccessContainer,
} from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
    quantity: number;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ProductsContainer>
          {products.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image src={product.imageUrl} alt="" width={120} height={110} />
              </ImageContainer>
            );
          })}
        </ProductsContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, seus produtos:{" "}
          {products.map((product) => {
            return (
              <>
                <strong key={product.id}>
                  {product.name} ({product.quantity}{" "}
                  {product.quantity <= 1 ? (
                    <span>unidade</span>
                  ) : (
                    <span>unidades</span>
                  )}
                  ),
                </strong>{" "}
              </>
            );
          })}
          já estão a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;

  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
