
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, ShoppingBag, Home } from "lucide-react";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Received");

  const [orderId] = useState(() => {
  return `PN-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
});


  useEffect(() => {
  // Stage 1: "Order Received"
  setOrderStatus("Order Received");
  setProgress(10); // Start at 10%

  const timer1 = setTimeout(() => {
    // Stage 2: "Processing"
    setOrderStatus("Processing");
    setProgress(50); // Halfway

    const timer2 = setTimeout(() => {
      // Stage 3: "Ready for Pickup"
      setOrderStatus("Ready for Pickup");
      setProgress(100); // Complete
    }, 7000); // 3 seconds after processing

    return () => clearTimeout(timer2);
  }, 10000); // 3 seconds after order received

  return () => clearTimeout(timer1);
}, []);


  return (
    <div className="container px-4 md:px-6 mx-auto py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto flex items-center justify-center mb-6">
            <BadgeCheck className="h-10 w-10 text-pick-green" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your order #{orderId} has been received and is being prepared.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-display font-semibold mb-4">Order Status</h2>
            
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Status: {orderStatus}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-100" />
            
            <div className="mt-6 grid grid-cols-3 text-center">
              <div className={`relative ${progress >= 0 ? "text-pick-green" : "text-gray-400"}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-current flex items-center justify-center">
                  <ShoppingBag className="h-3 w-3 text-white" />
                </div>
                <p className="mt-8 text-xs sm:text-sm">Received</p>
              </div>
              <div className={`relative ${progress >= 33 ? "text-pick-green" : "text-gray-400"}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-current flex items-center justify-center">
                  <Clock className="h-3 w-3 text-white" />
                </div>
                <p className="mt-8 text-xs sm:text-sm">Processing</p>
              </div>
              <div className={`relative ${progress >= 100 ? "text-pick-green" : "text-gray-400"}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-current flex items-center justify-center">
                  <BadgeCheck className="h-3 w-3 text-white" />
                </div>
                <p className="mt-8 text-xs sm:text-sm">Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-display font-semibold mb-4">Pickup Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Green Market Grocers</p>
                <p className="text-gray-600 dark:text-gray-400">123 Market Street, madurai</p>
                <p className="text-gray-600 dark:text-gray-400">625001</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Time</h3>
                <p className="text-gray-600 dark:text-gray-400">Your order will be ready in approximately 10 to 20 minutes.</p>
                <p className="text-gray-600 dark:text-gray-400">Store hours: 9:00 AM - 9:00 PM</p>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                <span className="font-medium">Important:</span> Please bring your order ID when picking up your order.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-pick-green hover:bg-pick-green-dark"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};


export default OrderConfirmationPage;
