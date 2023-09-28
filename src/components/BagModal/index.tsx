import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import camiseta from "../../assets/camisetas/1.png";
import { X } from "phosphor-react";

import {
  Content,
  Overlay,
  Product,
  ProductsList,
  FinalizePurchaseButton,
  PurchaseResume,
  CloseButton,
} from "./styles";

export function BagModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Sacola de compras</Dialog.Title>

        <ProductsList>
          <Product>
            <div className="imageContainer">
              <Image src={camiseta} alt="" />
            </div>

            <div className="infoProduct">
              <h4>Camiseta Beyond the Limits</h4>
              <strong>R$ 79,90</strong>

              <button>Remover</button>
            </div>
          </Product>

          <Product>
            <div className="imageContainer">
              <Image src={camiseta} alt="" />
            </div>

            <div className="infoProduct">
              <h4>Camiseta Beyond the Limits</h4>
              <strong>R$ 79,90</strong>

              <button>Remover</button>
            </div>
          </Product>

          <Product>
            <div className="imageContainer">
              <Image src={camiseta} alt="" />
            </div>

            <div className="infoProduct">
              <h4>Camiseta Beyond the Limits</h4>
              <strong>R$ 79,90</strong>

              <button>Remover</button>
            </div>
          </Product>
        </ProductsList>

        <footer>
          <PurchaseResume>
            <div className="quantity">
              <span>Quantidade</span>
              <span className="total">3 itens</span>
            </div>

            <div className="totalValue">
              <span>Valor total</span>
              <strong>R$ 270,00</strong>
            </div>
          </PurchaseResume>
          <FinalizePurchaseButton>Finalizar compra</FinalizePurchaseButton>
        </footer>

        <CloseButton>
          <X size={24} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  );
}
