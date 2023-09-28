import Link from "next/link";
import { BagButton, HeaderContainer } from "./styles";
import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import { Handbag } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import { BagModal } from "../BagModal";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="Ignite Shop Logo" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton>
            <Handbag size={24} />
          </BagButton>
        </Dialog.Trigger>

        <BagModal />
      </Dialog.Root>
    </HeaderContainer>
  );
}
