
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getShopById, getProductsByCategory } from "../data/mockData";
import { Product, ShopInfo } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import { Star, MapPin, Phone, Clock, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ShopDetailPage = () => {
  const { shopId = "" } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<ShopInfo | null>(null);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const shopData = getShopById(shopId);
      if (shopData) {
        setShop(shopData);
        const products = getProductsByCategory(shopId);
        setProductsByCategory(products);
      }
      setLoading(false);
    }, 800);
  }, [shopId]);

  if (loading) {
    return (
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 text-pick-green animate-spin" />
          <span className="ml-2 text-lg">Loading shop details...</span>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Shop not found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't find this shop. Please try another one.
          </p>
        </div>
      </div>
    );
  }

  const categories = Object.keys(productsByCategory);

  return (
    <div className="container px-4 md:px-6 mx-auto animate-fade-in">
      {/* Shop Header */}
      <div className="relative rounded-xl overflow-hidden h-64 mb-8">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-display font-bold mb-2">
                {shop.name}
              </h1>
              <div className="flex items-center">
                <Badge className="bg-yellow-500 text-white mr-2">
                  <Star className="h-3 w-3 fill-white text-white mr-1" />
                  {shop.rating.toFixed(1)}
                </Badge>
                <span className="text-white capitalize">{shop.type}</span>
              </div>
            </div>
            {shop.selfPickupOnly && (
              <Badge className="bg-pick-purple text-white">
                Self Pickup Only
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-4 gradient-card rounded-lg">
              <MapPin className="h-5 w-5 text-pick-green mr-3" />
              <div>
                <h3 className="text-sm font-semibold">Location</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">123 Market St, salem</p>
              </div>
            </div>
            <div className="flex items-center p-4 gradient-card rounded-lg">
              <Phone className="h-5 w-5 text-pick-green mr-3" />
              <div>
                <h3 className="text-sm font-semibold">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">04652 272282</p>
              </div>
            </div>
            <div className="flex items-center p-4 gradient-card rounded-lg">
              <Clock className="h-5 w-5 text-pick-green mr-3" />
              <div>
                <h3 className="text-sm font-semibold">Hours</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">9:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {shop.name} offers a wide selection of fresh groceries and household items. 
            Browse our products below and place your order for self-pickup.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">Products</h2>
        
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="mb-6 flex flex-wrap w-full h-auto gap-2 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger 
                key={category}
                value={category}
                className="data-[state=active]:bg-pick-green data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsByCategory[category].map((product) => (
                  <ProductCard key={product.id} product={product} shop={shop} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ShopDetailPage;
