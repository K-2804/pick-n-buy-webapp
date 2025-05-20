
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Newsletter Section */}
        <div className="py-10 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Subscribe to our newsletter for exclusive deals and updates
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="focus-visible:ring-pick-green"
              />
              <Button 
                type="submit"
                className="bg-pick-green hover:bg-pick-green-dark whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
          <div>
            <div className="font-display text-2xl font-bold mb-4">
              <span className="text-pick-green">Pick</span>
              <span className="text-gray-500">-n-</span>
              <span className="text-pick-orange">Buy</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
              Shop local groceries online and pick up your order directly from 
              nearby shops in your area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-200 dark:bg-gray-800 hover:bg-pick-green hover:text-white dark:hover:bg-pick-green transition-colors p-2 rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-gray-200 dark:bg-gray-800 hover:bg-pick-green hover:text-white dark:hover:bg-pick-green transition-colors p-2 rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-gray-200 dark:bg-gray-800 hover:bg-pick-green hover:text-white dark:hover:bg-pick-green transition-colors p-2 rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Shop Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Grocery Shops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Medical Shops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Nutrients Shops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Stationery Shops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Local Markets
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-pick-green mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">hello@picknbuy.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-pick-green mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+918976534580</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-pick-green mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">12/2 old cross street,<br />Pillar view, Chennai 600001</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pick-n-Buy. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-pick-green">Terms</a>
            <a href="#" className="hover:text-pick-green">Privacy</a>
            <a href="#" className="hover:text-pick-green">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
