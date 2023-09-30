import { useContext } from "react";

import Link from "next/link";
import { BagButton, HeaderContainer, ProductsCounter } from "./styles";
import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import { Handbag } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import { BagModal } from "../BagModal";
import { CartContext } from "@/contexts/CartContext";

export function Header() {
  const { productsInCart, productsAmount } = useContext(CartContext);

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="Ignite Shop Logo" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton>
            <Handbag size={24} />

            {productsInCart.length > 0 && (
              <ProductsCounter>
                <span>{productsAmount}</span>
              </ProductsCounter>
            )}
          </BagButton>
        </Dialog.Trigger>

        <BagModal />
      </Dialog.Root>
    </HeaderContainer>
  );
}
