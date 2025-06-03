import React from 'react';
import SectionTitle from './SectionTitle';
import { MapPin, Clock, Calendar } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Tournament Location</SectionTitle>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-1">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">RAMS SPORTS ARENA</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">VS Residency #46,2nd Cross Marathalli, Muneshwara Layout, Munnekollal, Bengaluru</div>
                        <div className="text-gray-600">Karnataka 560037</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <div className="font-medium">Date</div>
                        <div className="text-gray-600">8th June 2025, Sunday</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <div className="font-medium">Time</div>
                        <div className="text-gray-600">8:00 AM - 12:00 PM</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 mb-2">Facilities Available</h4>
                    <ul className="grid grid-cols-2 gap-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Changing Rooms
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Water Stations
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Cafeteria
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Parking
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        First Aid
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Spectator Seating
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <a 
                      href="https://maps.app.goo.gl/DBfqeYn1TuRTm6hA9" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:flex-1 h-64 md:h-auto">
                {/* For a real project, embed an actual Google Maps iframe here */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <img 
                    src="http://images.jdmagicbox.com/v2/comp/bangalore/w1/080pxx80.xx80.240306184737.n3w1/catalogue/rams-sports-arena-bangalore-sports-clubs-imq6su1a31.jpg" 
                    alt="Location" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;