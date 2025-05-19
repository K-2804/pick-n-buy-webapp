
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ShoppingBag, Clock, Star, ShieldCheck, Gift } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About <span className="text-pick-green">Pick</span>
            <span className="text-gray-500">-n-</span>
            <span className="text-pick-orange">Buy</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Connecting you with the best local shops in your neighborhood
          </p>
        </div>

        <Card className="mb-12 overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80" 
              alt="Local marketplace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="font-display text-2xl md:text-3xl font-bold">Our Mission</h2>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed mb-6">
              At Pick-n-Buy, we believe in strengthening local economies by connecting shoppers with neighborhood stores. Our mission is to make shopping from local businesses as convenient as possible while eliminating delivery fees through our innovative self-pickup model.
            </p>
            <p className="text-lg leading-relaxed">
              Pick-n-Buy has quickly grown to become a trusted platform for both shoppers and local store owners. We're passionate about providing fresh, quality products while supporting the businesses that make our communities special.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-green/10 p-4 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-pick-green" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Local Focus</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We exclusively partner with local businesses to keep money in your community.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-orange/10 p-4 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-pick-orange" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We carefully select our partner shops to ensure they meet our quality standards.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-pick-purple/10 p-4 rounded-full mb-4">
              <Star className="h-8 w-8 text-pick-purple" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our platform is designed with your convenience and satisfaction in mind.
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">Join Our Community</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Whether you're a shopper or a local business owner, Pick-n-Pay welcomes you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
