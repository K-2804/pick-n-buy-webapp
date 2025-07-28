
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "../contexts/CartContext";
import { paymentMethods } from "../data/mockData";
import { MapPin, CreditCard, Check, ArrowLeft, Truck, Package, Store } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { firestore, collection, addDoc } from "@/lib/firebase";

const CheckoutPage = () => {
  const { items, shop, getTotalPrice, clearCart, isDelivery, setIsDelivery, getDeliveryCharge } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDeliveryMethodChange = (value: string) => {
    setIsDelivery(value === "delivery");
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  
  if (!customerInfo.name || !customerInfo.phone || !customerInfo.email || !customerInfo.address || !customerInfo.pincode) {
    toast.error("Please fill in all required fields");
    return;
  }

  setIsSubmitting(true);
  
  const totalPrice = items.reduce((sum, item) => {
  return sum + item.product.price * item.quantity;
}, 0);

const latestOrder = {
  customerName: customerInfo.name,
  customerPhone: customerInfo.phone,
  orderItems: items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity,
  })),
  totalAmount: totalPrice,
  createdAt: new Date().toISOString(),
  status: 'pending',
};
 
  try {
    const docRef = await addDoc(collection(firestore, "orders"), latestOrder);
    console.log("Order saved with ID:", docRef.id);

    localStorage.setItem('latestOrder', JSON.stringify(latestOrder));

    navigate("/order-summary", {
      state: {
        items,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        paymentMethod,
        totalPrice,
      },
    });

    // <= Simulate order submission delay, clear cart and navigate confirmation =>
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation");
    }, 1500);
  } catch (error) {
    console.error("Error saving order:", error);
    toast.error("Failed to place order. Please try again.");
    setIsSubmitting(false);
  }
};

  
  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }
  
  const totalPrice = getTotalPrice();
  const deliveryCharge = getDeliveryCharge();
  const finalTotal = totalPrice + deliveryCharge;

  return (
    <div className="container px-4 md:px-6 mx-auto py-8 animate-fade-in">
      {shop && (
        <div className="mb-6 p-4 bg-gradient-to-r from-pick-green/10 to-pick-orange/10 rounded-lg">
          <div className="flex items-center">
            <Store className="h-5 w-5 text-pick-green mr-2" />
            <h2 className="text-xl font-display font-bold">
              Ordering from: {shop.name}
            </h2>
            <Badge className="ml-2 capitalize">{shop.type}</Badge>
          </div>
        </div>
      )}
      
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/cart")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Button>
        <h1 className="text-2xl md:text-3xl font-display font-bold">Checkout</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-xl font-display font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {!shop?.selfPickupOnly && (
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-semibold mb-4">Delivery Method</h2>
                    <RadioGroup 
                      value={isDelivery ? "delivery" : "pickup"} 
                      onValueChange={handleDeliveryMethodChange}
                      className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label 
                          htmlFor="pickup"
                          className="flex items-center cursor-pointer py-2"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Self Pickup (Free)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label 
                          htmlFor="delivery"
                          className="flex items-center cursor-pointer py-2"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Home Delivery (₹{shop?.deliveryCharge?.toFixed(2)})
                        </Label>
                      </div>
                    </RadioGroup>
                    <Separator className="my-6" />
                  </div>
                )}
                
                <div className="mb-6">
                  <h2 className="text-xl font-display font-semibold mb-4">{isDelivery ? "Delivery" : "Pickup"} Information</h2>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Your address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="Your PIN code"
                      value={customerInfo.pincode}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="mt-4 flex items-start">
                    {isDelivery ? (
                      <>
                        <Truck className="h-5 w-5 text-pick-green mt-0.5 mr-2 shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your order will be delivered to your address. Delivery charge of ${deliveryCharge.toFixed(2)} will be added to your total.
                        </p>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 text-pick-green mt-0.5 mr-2 shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You'll need to visit <strong>{shop?.name}</strong> to collect your order.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h2 className="text-xl font-display font-semibold mb-4">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label 
                            htmlFor={method.id}
                            className="flex-grow cursor-pointer py-2"
                          >
                            {method.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-start mb-4">
                        <CreditCard className="h-5 w-5 text-pick-green mt-0.5 mr-2 shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          All payments are secure and encrypted. {!isDelivery && "You'll pay when you pick up your order."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    type="submit"
                    className="w-full bg-pick-green hover:bg-pick-green-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                      {item.product.discountedPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{isDelivery ? "Delivery Fee" : "Pickup Fee"}</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="flex">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 shrink-0" />
                  {isDelivery ? (
                    <p className="text-sm text-green-800 dark:text-green-400">
                      Your order will be delivered to your address for a ₹{deliveryCharge.toFixed(2)} delivery fee.
                    </p>
                  ) : (
                    <p className="text-sm text-green-800 dark:text-green-400">
                      Self-pickup means no delivery fees! Collect your order directly from {shop?.name}.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
