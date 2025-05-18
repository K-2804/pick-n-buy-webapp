
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t py-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-display text-xl font-bold mb-4">
              <span className="text-pick-green">Pick</span>
              <span className="text-gray-500">-n-</span>
              <span className="text-pick-orange">Pay</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Shop local groceries online and pick up your order directly from 
              nearby shops in your area.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-base mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pick-green dark:hover:text-pick-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-base mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: hello@picknpay.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Market Street, San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pick-n-Pay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
