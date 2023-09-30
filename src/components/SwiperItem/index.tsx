import Link from "next/link";
import Image from "next/image";
import { AddToBagButton, Product } from "./styles";
import { Bag } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

interface SwiperItemProps {
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

export function SwiperItem({ product }: SwiperItemProps) {
  const { AddProductToCart } = useContext(CartContext);

  function handleAddToCartButton() {
    AddProductToCart(product);
  }

  return (
    <Product className="keen-slider__slide">
      <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </Link>

      <footer>
        <div className="left">
          <strong>{product.name}</strong>
          <span>{product.priceFormatted}</span>
        </div>

        <AddToBagButton onClick={handleAddToCartButton}>
          <Bag size={32} weight="bold" />
        </AddToBagButton>
      </footer>
    </Product>
  );
}
