import { ReactNode, createContext, useState } from "react";

interface ShoppingContextProviderProps {
  children: ReactNode;
}

interface ProductInCart {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceFormatted: string;
  description: string;
  defaultPriceId: string;
  quantity: number;
}

interface CartContextType {
  productsInCart: ProductInCart[];
  addProductToCart: (product: ProductInCart) => void;
  removeProductFromCart: (id: string) => void;

  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
  productsAmount: number;

  startCheckoutLoading: () => void;
  stopCheckoutLoading: () => void;
  isCreatingCheckoutSection: boolean;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({
  children,
}: ShoppingContextProviderProps) {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([]);

  const [isCreatingCheckoutSection, setIsCreatingCheckoutSection] =
    useState(false);

  function startCheckoutLoading() {
    setIsCreatingCheckoutSection(true);
  }

  function stopCheckoutLoading() {
    setIsCreatingCheckoutSection(false);
  }

  const productsAmount = productsInCart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  function addProductToCart(product: ProductInCart) {
    const existingProduct = productsInCart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };

      const updatedCart = productsInCart.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );

      setProductsInCart(updatedCart);
    } else {
      const productWithDefaultQuantity = { ...product, quantity: 1 };
      setProductsInCart((state) => [...state, productWithDefaultQuantity]);
    }
  }

  function removeProductFromCart(id: string) {
    const productsWithoutRemovedOne = productsInCart.filter((product) => {
      return product.id !== id;
    });

    setProductsInCart(productsWithoutRemovedOne);
  }

  function addQuantity(id: string) {
    const productsUpdated = productsInCart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      } else {
        return product;
      }
    });

    setProductsInCart(productsUpdated);
  }

  function removeQuantity(id: string) {
    const productsUpdated = productsInCart.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      } else {
        return product;
      }
    });

    setProductsInCart(productsUpdated);
  }

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        addProductToCart,
        removeProductFromCart,
        addQuantity,
        removeQuantity,
        productsAmount,
        startCheckoutLoading,
        stopCheckoutLoading,
        isCreatingCheckoutSection,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
