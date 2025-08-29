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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={BadmintonLogo}
            alt="Badminton Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl md:text-2xl text-white-600">
            Shuttle Showdown
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#rules">Rules</Link>
          <Link href="#tournament-results">Tournament Results</Link>
          <Link href="#location">Location</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="#home" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="#rules" onClick={() => setIsMenuOpen(false)}>
              Rules
            </Link>
            <Link
              href="#tournament-results"
              onClick={() => setIsMenuOpen(false)}
            >
              Tournament Results
            </Link>
            <Link href="#location" onClick={() => setIsMenuOpen(false)}>
              Location
            </Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
