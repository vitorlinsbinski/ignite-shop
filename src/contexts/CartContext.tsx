import { ReactNode, createContext, useState } from "react";

interface ShoppingContextProviderProps {
  children: ReactNode;
}

interface ProductInCart {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
  quantity: number;
}

interface CartContextType {
  productsInCart: ProductInCart[];
  AddProductToCart: (id: string) => void;
  RemoveProductFromCart: (id: string) => void;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({
  children,
}: ShoppingContextProviderProps) {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([]);

  function AddProductToCart(id: string) {
    console.log(id, "Product Added!");
  }

  function RemoveProductFromCart(id: string) {
    console.log(id, "Product Removed");
  }

  return (
    <CartContext.Provider
      value={{ productsInCart, AddProductToCart, RemoveProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
