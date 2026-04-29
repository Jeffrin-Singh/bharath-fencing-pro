import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold gold-text">404</h1>
        <p className="mt-3 text-lg text-muted-foreground">This page doesn't exist.</p>
        <a href="/" className="btn-gold mt-6 inline-flex">Return Home</a>
      </div>
    </div>
  );
};

export default NotFound;
