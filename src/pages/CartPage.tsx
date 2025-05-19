
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const CartPage = () => {
  const { items, shop, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-pick-green hover:bg-pick-green-dark"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-6">Your Cart</h1>
      
      {shop && (
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 h-40 md:h-auto">
              <img 
                src={shop.image} 
                alt={shop.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-display font-semibold mb-1">{shop.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 capitalize mb-2">{shop.type}</p>
                  <div className="flex items-center">
                    <Badge className="bg-yellow-500 text-white">
                      {shop.rating.toFixed(1)} ★
                    </Badge>
                    {shop.selfPickupOnly && (
                      <Badge className="bg-pick-purple text-white ml-2">
                        Self Pickup Only
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-32 h-32">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.product.category}</p>
                        {item.product.isHotDeal && (
                          <span className="hot-deal-badge inline-block mt-1">
                            Hot Deal
                          </span>
                        )}
                      </div>
                      
                      <div className="text-right">
                        {item.product.discountedPrice ? (
                          <div className="flex flex-col items-end">
                            <span className="text-lg font-semibold text-pick-green">
                              ₹{item.product.discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-semibold">
                            ₹{item.product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Pickup Fee</span>
                  <span>₹0.00</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0">
              <Button 
                className="w-full bg-pick-green hover:bg-pick-green-dark"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
