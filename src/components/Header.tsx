
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Home, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [pincode, setPincode] = useState("");
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      navigate(`/shops/${pincode}`);
    }
  };

  const getPageName = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path.includes("/shops/")) return "Shop Listings";
    if (path.includes("/shop/")) return "Shop Details";
    if (path === "/cart") return "Shopping Cart";
    if (path === "/checkout") return "Checkout";
    if (path === "/order-confirmation") return "Order Confirmation";
    if (path === "/about") return "About Us";
    return "Pick-n-Pay";
  };

  return (
    <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10 shadow-sm">
      <div className="container py-4 px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-display text-2xl font-bold">
              <span className="text-pick-green">Pick</span>
              <span className="text-gray-500">-n-</span>
              <span className="text-pick-orange">Pay</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <span className="font-display text-lg font-medium text-gray-800 dark:text-gray-200">{getPageName()}</span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-pick-green transition-colors">
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-pick-green transition-colors">
                <Info className="h-5 w-5" />
                <span className="font-medium">About</span>
              </Link>
            </nav>
            <Link to="/cart">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-pick-green transition-colors" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-pick-orange hover:bg-pick-orange text-white w-5 h-5 flex items-center justify-center p-0 rounded-full text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </div>
            </Link>
          </div>
        </div>
        
        <div className="mt-4 md:hidden">
          <form className="flex w-full" onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Enter PIN code..."
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="rounded-r-none focus-visible:ring-pick-green"
            />
            <Button 
              type="submit" 
              className="rounded-l-none bg-pick-green hover:bg-pick-green-dark"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
