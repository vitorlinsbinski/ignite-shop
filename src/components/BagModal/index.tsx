import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import { Minus, Plus, X } from "phosphor-react";
import { useContext, useState } from "react";

import {
  Content,
  Overlay,
  Product,
  ProductsList,
  FinalizePurchaseButton,
  PurchaseResume,
  CloseButton,
  ProductCounter,
} from "./styles";

import { CartContext } from "@/contexts/CartContext";
import axios from "axios";
import { LoadingComponent } from "../LoadingComponent";

export function BagModal() {
  const {
    productsInCart,
    removeProductFromCart,
    addQuantity,
    removeQuantity,
    productsAmount,
    startCheckoutLoading,
    stopCheckoutLoading,
    isCreatingCheckoutSection,
  } = useContext(CartContext);
  console.log(productsInCart);

  const totalAmount = productsInCart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalAmountFormatted = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(totalAmount);

  async function handleBuyProduct() {
    const requestData = productsInCart.map((product) => ({
      priceId: product.defaultPriceId,
      quantity: product.quantity, // Inclua a quantidade aqui
    }));

    try {
      startCheckoutLoading();

      const response = await axios.post("/api/checkout", {
        products: requestData,
      });

      const { checkoutUrl } = response.data;

      // Redirect to the checkout page
      window.location.href = checkoutUrl;
    } catch {
      stopCheckoutLoading();
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Dialog.Portal>
      {isCreatingCheckoutSection && <LoadingComponent />}
      <Overlay />

      <Content>
        <Dialog.Title>Sacola de compras</Dialog.Title>

        <ProductsList>
          {productsInCart.map((product) => {
            return (
              <Product key={product.id}>
                <div className="imageContainer">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={94}
                    height={120}
                  />
                </div>

                <div className="infoProduct">
                  <h4>{product.name}</h4>
                  <strong>{product.priceFormatted}</strong>

                  <ProductCounter>
                    <button
                      onClick={() => removeQuantity(product.id)}
                      disabled={product.quantity == 1}
                    >
                      <Minus size={13} weight="bold" />
                    </button>

                    <span>{product.quantity}</span>

                    <button onClick={() => addQuantity(product.id)}>
                      <Plus size={13} weight="bold" />
                    </button>
                  </ProductCounter>

                  <button
                    onClick={() => {
                      removeProductFromCart(product.id);
                    }}
                  >
                    Remover
                  </button>
                </div>
              </Product>
            );
          })}
        </ProductsList>

        <footer>
          <PurchaseResume>
            <div className="quantity">
              <span>Quantidade</span>
              <span className="total">{productsAmount} itens</span>
            </div>

            <div className="totalValue">
              <span>Valor total</span>
              <strong>{totalAmountFormatted}</strong>
            </div>
          </PurchaseResume>
          <FinalizePurchaseButton
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSection}
          >
            Finalizar compra
          </FinalizePurchaseButton>
        </footer>

        <CloseButton>
          <X size={24} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  );
}
