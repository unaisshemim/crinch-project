import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

const Navigation = ({ isSingle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the current path is "/auth"
  const isAuthPage = location.pathname === "/auth";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/home"
            className="flex items-center space-x-2 text-love-600 hover:text-love-700 transition-colors"
          >
            <Heart className="h-6 w-6 animate-pulse-slow" />
            <span className="font-playfair text-xl font-semibold">
              Valentine's Love
            </span>
          </Link>
          {/* Conditionally render the navigation links based on the path */}
          {!isAuthPage && (
            <div>
              {isSingle ? (
                <div className="hidden md:flex items-center space-x-8">
                  <NavLink to="/home" current={location.pathname}>
                    Home
                  </NavLink>
                  <NavLink to="/" current={location.pathname}>
                    Login
                  </NavLink>
                  <NavLink to="/chat" current={location.pathname}>
                    Chat
                  </NavLink>
                  <NavLink to="/task" current={location.pathname}>
                    Task Assign
                  </NavLink>
                  <NavLink to="/flames" current={location.pathname}>
                    Flames
                  </NavLink>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-8">
                  <NavLink to="/home" current={location.pathname}>
                    Home
                  </NavLink>
                  <NavLink to="/" current={location.pathname}>
                    Login
                  </NavLink>
                  <NavLink to="/agreement" current={location.pathname}>
                    Agreement
                  </NavLink>
                  <NavLink to="/chat" current={location.pathname}>
                    Chat
                  </NavLink>
                  <NavLink to="/task" current={location.pathname}>
                    Task Assign
                  </NavLink>
                  <NavLink to="/flames" current={location.pathname}>
                    Flames
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  to,
  children,
  current,
}: {
  to: string;
  children: React.ReactNode;
  current: string;
}) => {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`relative font-inter text-sm font-medium transition-colors hover:text-love-600
        ${isActive ? "text-love-600" : "text-gray-600"}
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
        after:bg-love-400 after:origin-right after:scale-x-0 
        after:transition-transform after:duration-300
        hover:after:origin-left hover:after:scale-x-100
      `}
    >
      {children}
    </Link>
  );
};

export default Navigation;