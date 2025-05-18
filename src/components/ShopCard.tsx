
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShopInfo } from "../contexts/CartContext";

interface ShopCardProps {
  shop: ShopInfo;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Link to={`/shop/${shop.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover-lift h-full">
        <div className="relative h-48">
          <img 
            src={shop.image} 
            alt={shop.name} 
            className="w-full h-full object-cover"
          />
          {shop.selfPickupOnly && (
            <Badge className="absolute top-3 left-3 bg-pick-purple text-white">
              Self Pickup Only
            </Badge>
          )}
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
