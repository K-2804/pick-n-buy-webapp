
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopsByPincode } from "../data/mockData";
import { ShopInfo } from "../contexts/CartContext";
import ShopCard from "../components/ShopCard";
import { MapPin, Loader } from "lucide-react";

const ShopsPage = () => {
  const { pincode = "" } = useParams<{ pincode: string }>();
  const [shops, setShops] = useState<ShopInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const shopsData = getShopsByPincode(pincode);
      setShops(shopsData);
      setLoading(false);
    }, 800);
  }, [pincode]);

  return (
    <div className="container px-4 md:px-6 mx-auto">
      <div className="flex items-center mb-8">
        <MapPin className="h-5 w-5 mr-2 text-pick-green" />
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Shops near <span className="text-pick-green">{pincode}</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader className="h-8 w-8 text-pick-green animate-spin" />
          <span className="ml-2 text-lg">Finding shops near you...</span>
        </div>
      ) : shops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No shops found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't find any shops in this area. Please try another PIN code.
          </p>
        </div>
      )}
    </div>
  );
};


export default ShopsPage;
