
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background">
      <div className="text-center p-8 glass rounded-lg max-w-md mx-auto">
        <h1 className="text-5xl font-display font-semibold mb-4 gradient-text">404</h1>
        <p className="text-xl font-serif text-muted-foreground mb-6">The page you're looking for doesn't exist</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground transition-all hover:opacity-90 hover:translate-y-[-2px]"
        >
          Return to Tribute Book
        </a>
      </div>
    </div>
  );
};

export default NotFound;
