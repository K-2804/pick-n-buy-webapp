
import { Star, Truck, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShopInfo } from "../contexts/CartContext";

interface ShopCardProps {
  shop: ShopInfo;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  // Function to get shop type badge color
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'grocery':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medical':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'nutrients':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'stationary':
      case 'stationery':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Link to={`/shop/${shop.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover-lift h-full">
        <div className="relative h-48">
          <img 
            src={shop.image} 
            alt={shop.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {shop.selfPickupOnly ? (
              <Badge className="bg-pick-purple text-white">
                <Package className="h-3 w-3 mr-1" />
                Self Pickup Only
              </Badge>
            ) : (
              <Badge className="bg-pick-green text-white">
                <Truck className="h-3 w-3 mr-1" />
                Delivery Available
              </Badge>
            )}
            <Badge className={getTypeColor(shop.type)}>
              {shop.type}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-display text-lg font-semibold line-clamp-1">{shop.name}</h3>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full text-xs">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
              <span>{shop.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 capitalize">{shop.type}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopCard;
