
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Oops! We couldn't find that page</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button asChild className="bg-pick-green hover:bg-pick-green-dark">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
