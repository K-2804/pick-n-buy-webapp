
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ShoppingBag, Clock } from "lucide-react";

const HomePage = () => {
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      navigate(`/shops/${pincode}`);
    }
  };

  return (
    <div className="container px-4 md:px-6 mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Shop Local, 
              <span className="highlight-text"> Pick Up Fresh</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg">
              Browse products from local shops in your area and pick them up at your convenience.
            </p>
            
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter your PIN code..."
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="focus-visible:ring-pick-green"
              />
              <Button 
                type="submit"
                className="bg-pick-green hover:bg-pick-green-dark"
              >
                Find Shops
              </Button>
            </form>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pick-orange/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pick-green/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 -left-4 w-16 h-16 bg-pick-purple/20 rounded-full blur-xl"></div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" 
                alt="Local grocery shopping" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How Pick-n-Pay Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Shopping from local stores has never been easier. Pick-n-Pay connects you with shops in your neighborhood.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="gradient-card p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-green/10 p-4 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-pick-green" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Enter Your Location</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your PIN code to find shops available in your area.
            </p>
          </div>
          
          <div className="gradient-card p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-orange/10 p-4 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-pick-orange" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Order Products</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse products from local shops and add them to your cart.
            </p>
          </div>
          
          <div className="gradient-card p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-purple/10 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-pick-purple" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Pick Up</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visit the shop at your convenience and pick up your order.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-pick-green/5 to-pick-purple/5 rounded-3xl my-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose Pick-n-Pay?</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          <div className="p-6 text-center">
            <h3 className="text-xl font-display font-semibold mb-4">Support Local Businesses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Help your local economy thrive by shopping from neighborhood stores.
            </p>
          </div>
          
          <div className="p-6 text-center">
            <h3 className="text-xl font-display font-semibold mb-4">Fresh Products</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get the freshest groceries without waiting for delivery.
            </p>
          </div>
          
          <div className="p-6 text-center">
            <h3 className="text-xl font-display font-semibold mb-4">No Delivery Fees</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Save on delivery charges by picking up your order yourself.
            </p>
          </div>
          
          <div className="p-6 text-center">
            <h3 className="text-xl font-display font-semibold mb-4">Hot Deals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover exclusive discounts and offers from local shops.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Enter your PIN code and discover shops near you.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
            <Input
              type="text"
              placeholder="Enter your PIN code..."
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="sm:max-w-xs focus-visible:ring-pick-green"
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-pick-green hover:bg-pick-green-dark"
            >
              Find Shops
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
