import React from 'react';
import { BanIcon as BadmintonIcon, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <BadmintonIcon className="w-8 h-8 text-blue-400 mr-2" />
            <span className="font-bold text-xl">Shuttle Showdown</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">
              <Twitter size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About the Tournament</h4>
              <p className="text-gray-400">
                Shuttle Showdown is an internal friendly badminton tournament bringing together
                players for a day of competitive fun and sportsmanship.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#rules" className="hover:text-white transition-colors duration-200">Rules</a></li>
                <li><a href="#location" className="hover:text-white transition-colors duration-200">Location</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Tournament Details</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Date: 8th June 2025, Sunday</li>
                <li>Time: 8:00 AM - 12:00 PM</li>
                <li>Location: RAMs Sports Arena</li>
                <li>Format: Regular Doubles</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Shuttle Showdown. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;