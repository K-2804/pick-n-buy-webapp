
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  category: string;
  isHotDeal?: boolean;
  inStock: boolean;
}

export interface ShopInfo {
  id: string;
  name: string;
  image: string;
  rating: number;
  type: string;
  selfPickupOnly: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  shop: ShopInfo | null;
  addItem: (product: Product, shop: ShopInfo) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shop, setShop] = useState<ShopInfo | null>(null);

  const addItem = (product: Product, shopInfo: ShopInfo) => {
    if (shop && shop.id !== shopInfo.id) {
      toast("You can only order from one shop at a time. Clear your cart to order from a different shop.", {
        description: "Would you like to clear your cart?",
        action: {
          label: "Clear Cart",
          onClick: () => {
            clearCart();
            addItem(product, shopInfo);
          },
        },
      });
      return;
    }

    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    if (!shop) {
      setShop(shopInfo);
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });

    toast.success(`Added ${product.name} to your cart`);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    toast.info("Item removed from cart");

    // If cart is empty after removing, reset shop as well
    if (items.length === 1) {
      setShop(null);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setShop(null);
    toast.info("Cart cleared");
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + (item.product.discountedPrice || item.product.price) * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        shop,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
