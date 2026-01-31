import React, { useState } from "react";
import tournamentOfficialsImage from "../../images/hostandref.jpeg";
import allFinalistsImage from "../../images/image_4.jpeg";
import runner2Image from "../../images/runner.jpeg";
import secondSeasonImage from "../../images/season2_all.jpeg";
import semis1Image from "../../images/semis1.jpeg";
import semis2Image from "../../images/semis2.jpeg";
import winner2Image from "../../images/winner.jpeg";
import winnerS4Image from "../../images/winner_s4.jpeg";
import runnerS4Image from "../../images/runner_s4.jpeg";
import firstSemiS4Image from "../../images/1stsemi_s4.jpeg";
import secondSemiS4Image from "../../images/2ndsemi_s4.jpeg";
import SectionTitle from "./SectionTitle";

const TournamentResults: React.FC = () => {
  const [expandedTournament, setExpandedTournament] = useState<string | null>("4th");

  const toggleTournament = (tournament: string) => {
    setExpandedTournament(expandedTournament === tournament ? null : tournament);
  };

  return (
    <section id="tournament-results" className="py-20 bg-gray-50">
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        @keyframes rotate-icon {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
        .rotate-icon {
          animation: rotate-icon 0.3s ease-out forwards;
        }
        .tournament-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tournament-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .tournament-button:active {
          transform: translateY(0);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <SectionTitle>Tournament Results</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <div className="w-full">
                {/* Fourth Tournament Section - Always Visible */}
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                    Latest Tournament Results (4th Edition)
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
                        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4">
                          <img
                            src={winnerS4Image}
                            alt="Tournament Winners - Gopichand and Vishesh"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-center mb-2">
                          Gopichand & Vishesh
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
                        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4">
                          <img
                            src={runnerS4Image}
                            alt="Tournament Runners-up - Aniketh and Mohan"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-center mb-2">
                          Aniketh & Mohan
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
                        <div className="w-full h-48 sm:h-48 md:h-48 overflow-hidden rounded-lg shadow-md mb-3">
                          <img
                            src={firstSemiS4Image}
                            alt="Semifinalists - Anshuman and Roshan"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                          />
                        </div>
                        <h5 className="font-semibold text-center mb-1">
                          Anshuman & Roshan
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
                        <div className="w-full h-48 sm:h-48 md:h-48 overflow-hidden rounded-lg shadow-md mb-3">
                          <img
                            src={secondSemiS4Image}
                            alt="Semifinalists - Dhanuj and Sarthak"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                          />
                        </div>
                        <h5 className="font-semibold text-center mb-1">
                          Dhanuj & Sarthak
                        </h5>
                        <p className="text-sm text-gray-600 text-center">
                          Bronze Medal Winners
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider after 4th Tournament */}
                <div className="mt-12 pt-12 border-t-2 border-purple-100"></div>

                {/* Third Tournament Section */}
                <div className="mb-16 pt-12">
                  <button
                    onClick={() => toggleTournament("3rd")}
                    className="tournament-button w-full text-left bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-between mb-6 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Third Tournament Results
                      </h3>
                    </div>
                    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <span className={`text-2xl sm:text-3xl font-light transition-transform duration-300 ${expandedTournament === "3rd" ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </div>
                  </button>

                  {expandedTournament === "3rd" && (
                    <div className="animate-slide-down">
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
                  )}
                </div>

                {/* Second Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-green-100">
                  <button
                    onClick={() => toggleTournament("2nd")}
                    className="tournament-button w-full text-left bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 text-white p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-between mb-6 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Second Tournament Results
                      </h3>
                    </div>
                    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <span className={`text-2xl sm:text-3xl font-light transition-transform duration-300 ${expandedTournament === "2nd" ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </div>
                  </button>

                  {expandedTournament === "2nd" && (
                    <div className="animate-slide-down">
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
                  )}
                </div>

                {/* First Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-blue-100">
                  <button
                    onClick={() => toggleTournament("1st")}
                    className="tournament-button w-full text-left bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-between mb-6 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        First Tournament Results
                      </h3>
                    </div>
                    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <span className={`text-2xl sm:text-3xl font-light transition-transform duration-300 ${expandedTournament === "1st" ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </div>
                  </button>

                  {expandedTournament === "1st" && (
                    <div className="animate-slide-down">
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
                  )}
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
