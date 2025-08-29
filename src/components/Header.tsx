import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "./Navigation";
import BadmintonLogo from "../../images/Image_2.jpeg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#rules", label: "Rules" },
    { href: "#tournament-results", label: "Tournament Results" },
    { href: "#location", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={BadmintonLogo}
            alt="Badminton Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl md:text-2xl text-gray-800">
            Shuttle Showdown
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation with Enhanced Animations */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <div
                  key={item.href}
                  className={`transform transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
                  }}
                >
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    <div className="text-center py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-blue-200 hover:shadow-md">
                      <span className="text-base font-semibold tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
