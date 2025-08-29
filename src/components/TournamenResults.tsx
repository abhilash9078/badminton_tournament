import React from "react";
import SectionTitle from "./SectionTitle";
import allFinalistsImage from "../../images/image_4.jpeg";
import tournamentOfficialsImage from "../../images/hostandref.jpeg";
// Import new images for the second tournament
import winner2Image from "../../images/winner.jpeg";
import runner2Image from "../../images/runner.jpeg";
import semis1Image from "../../images/semis1.jpeg";
import semis2Image from "../../images/semis2.jpeg";
import secondSeasonImage from "../../images/season2_all.jpeg";

const TournamentResults: React.FC = () => {
  return (
    <section id="tournament-results" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Tournament Results</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <div className="w-full">
                {/* Third Tournament Section */}
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                    Latest Tournament Results (3rd Edition)
                  </h3>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Winners */}
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl overflow-hidden shadow-lg">
                      <div className="p-4 bg-yellow-500 text-white">
                        <h4 className="text-xl font-bold text-center">
                          Champions
                        </h4>
                      </div>
                      <div className="p-5">
                        <img
                          src={winner2Image}
                          alt="Tournament Winners - Bharath and Karthik"
                          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                        />
                        <h5 className="text-lg font-semibold text-center mb-2">
                          Bharath & Karthik
                        </h5>
                        <p className="text-sm text-gray-600 text-center">
                          Gold Trophy Winners
                        </p>
                      </div>
                    </div>

                    {/* Runners-up */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                      <div className="p-4 bg-gray-500 text-white">
                        <h4 className="text-xl font-bold text-center">
                          Runners-up
                        </h4>
                      </div>
                      <div className="p-5">
                        <img
                          src={runner2Image}
                          alt="Tournament Runners-up - Sanjay and Aditya"
                          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                        />
                        <h5 className="text-lg font-semibold text-center mb-2">
                          Sanjay & Aditya
                        </h5>
                        <p className="text-sm text-gray-600 text-center">
                          Silver Trophy Winners
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Semifinalists 1 */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                      <div className="p-3 bg-amber-400 text-white">
                        <h4 className="font-bold text-center">Semifinalists</h4>
                      </div>
                      <div className="p-4">
                        <img
                          src={semis1Image}
                          alt="Semifinalists - Kush and Rony"
                          className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                        />
                        <h5 className="font-semibold text-center mb-1">
                          Kush & Rony
                        </h5>
                        <p className="text-sm text-gray-600 text-center">
                          Bronze Medal Winners
                        </p>
                      </div>
                    </div>

                    {/* Semifinalists 2 */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                      <div className="p-3 bg-amber-400 text-white">
                        <h4 className="font-bold text-center">Semifinalists</h4>
                      </div>
                      <div className="p-4">
                        <img
                          src={semis2Image}
                          alt="Semifinalists - Purushottam and Suman"
                          className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                        />
                        <h5 className="font-semibold text-center mb-1">
                          Purushottam & Suman
                        </h5>
                        <p className="text-sm text-gray-600 text-center">
                          Bronze Medal Winners
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-green-100">
                  <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                    Second Tournament Results
                  </h3>

                  <div className="mt-8 text-center">
                    <img
                      src={secondSeasonImage}
                      alt="Second tournament finalists"
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                    <p className="text-sm text-gray-600 mt-3">
                      Second Tournament Finalists
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-yellow-700 mb-3 text-center">
                        Champions
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Shivam & Jay</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Gold Trophy Winners
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-3 text-center">
                        Runners-up
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Sarthak & Mahendran</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Silver Trophy Winners
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-amber-700 mb-3 text-center">
                        Semifinalists
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Rishav & Mano</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center mt-3">
                        <p className="font-medium">Shivam & Tanmay</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* First Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-blue-100">
                  <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                    First Tournament Results
                  </h3>

                  <div className="mt-8 text-center">
                    <img
                      src={allFinalistsImage}
                      alt="All tournament finalists"
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                    <p className="text-sm text-gray-600 mt-3">
                      First Tournament Finalists
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-yellow-700 mb-3 text-center">
                        Champions
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Himanshu & Surya</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Gold Trophy Winners
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-gray-700 mb-3 text-center">
                        Runners-up
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Abhi & Soumya</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Silver Trophy Winners
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm">
                      <h4 className="font-semibold text-amber-700 mb-3 text-center">
                        Semifinalists
                      </h4>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="font-medium">Mahendran & Shivam</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center mt-3">
                        <p className="font-medium">Ankit & Anurag</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
                    Tournament Officials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">
                        Referees
                      </h4>
                      <ul className="space-y-2">
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Amol (co-host)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>DK (referee)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Arijit (referee)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Abhilash (website-handler)</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">
                        Tournament Host
                      </h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-medium">Organized by:</p>
                        <p className="mt-1">Anup Badminton Academy</p>
                        <p className="text-sm text-gray-600 mt-3">
                          Led by Tournament Director:
                        </p>
                        <p className="font-medium">Anup Kumar</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <img
                      src={tournamentOfficialsImage}
                      alt="Tournament officials and organizers"
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                    <p className="text-sm text-gray-600 mt-3">
                      Our dedicated team of referees and organizers
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <blockquote className="italic text-gray-700 px-8 relative">
                      <span className="text-4xl text-blue-300 absolute left-0 top-0">
                        "
                      </span>
                      A heartfelt thank you to our incredible hosts for creating
                      this amazing tournament. Your dedication to bringing
                      players together and fostering the spirit of competition
                      has made this event truly special. The smooth organization
                      and warm hospitality have set a new standard for badminton
                      tournaments.
                      <span className="text-4xl text-blue-300 absolute right-0 bottom-0">
                        "
                      </span>
                    </blockquote>
                    <p className="mt-4 font-medium">
                      - On behalf of all participants
                    </p>
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

export default TournamentResults;
