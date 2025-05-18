
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Product, ShopInfo, useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  shop: ShopInfo;
}

const ProductCard = ({ product, shop }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, shop);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-40 sm:h-48 bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.isHotDeal && (
          <div className="absolute top-2 right-2 hot-deal-badge">
            Hot Deal
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white text-gray-800 px-3 py-1 rounded-full font-medium text-sm">
              Out of Stock
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <div className="mt-1">
          {product.discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-pick-green">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-pick-green hover:bg-pick-green-dark"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
