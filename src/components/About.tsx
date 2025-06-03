import React from 'react';
import SectionTitle from './SectionTitle';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>About The Tournament</SectionTitle>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-8 text-center">
            Shuttle Showdown is an internal friendly badminton tournament designed to bring together badminton enthusiasts
            for a day of competitive fun and sportsmanship.
          </p>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img 
                  className="h-full w-full object-cover" 
                  src="https://images.pexels.com/photos/3979126/pexels-photo-3979126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Badminton players" 
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">Tournament Format</div>
                <p className="mt-2 text-gray-600">
                  The tournament follows a Regular Doubles format with a maximum of 32 players (16 teams). Teams will be 
                  divided into 4 pools with 4 teams each. The top teams from each pool will advance to the knockout stage 
                  starting from quarter-finals.
                </p>
                <div className="mt-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">16</div>
                    <div className="ml-4">
                      <div className="font-medium">Teams</div>
                      <div className="text-sm text-gray-500">Competing in the tournament</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
                    <div className="ml-4">
                      <div className="font-medium">Pools</div>
                      <div className="text-sm text-gray-500">Round-robin league matches</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">QF</div>
                    <div className="ml-4">
                      <div className="font-medium">Knockout Stage</div>
                      <div className="text-sm text-gray-500">From quarter-finals onwards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;