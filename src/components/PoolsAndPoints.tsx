import React from "react";
import SectionTitle from "./SectionTitle";

const PoolsAndPoints: React.FC = () => {
  return (
    <section id="pools-points" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Tournament Structure</SectionTitle>

        {/* Live Pools Button */}
        <div className="max-w-5xl mx-auto mb-12 flex justify-center">
          <a
            href="/pools"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-3 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live Pools & Scoring
          </a>
        </div>

        {/* Info Card about Pools */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                🏆 Pool Stage Information
              </h3>
              <p className="text-lg text-gray-700">
                Click the button above to view live pool standings, scores, and real-time updates!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">📊 Pool Structure</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">▸</span>
                    24 teams divided into 8 pools
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">▸</span>
                    3 teams per pool
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">▸</span>
                    Round-robin format
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">▸</span>
                    Top 2 teams from each pool qualify
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">🎯 Advancement</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">▸</span>
                    16 teams advance to Round of 16
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">▸</span>
                    Winners determined by points
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">▸</span>
                    Single elimination from QF onwards
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">▸</span>
                    Finals: Best of 3 sets
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Progression Flowchart */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Tournament Progression
          </h3>

          <div className="relative">
            {/* Group Stage */}
            <div className="flex justify-center mb-16">
              <div className="bg-blue-50 rounded-xl p-5 w-full max-w-4xl text-center border-2 border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Group Stage
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <p className="font-medium text-blue-800 text-sm">Pool A</p>
                    <p className="text-xs text-blue-600">3 Teams</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <p className="font-medium text-green-800 text-sm">Pool B</p>
                    <p className="text-xs text-green-600">3 Teams</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <p className="font-medium text-purple-800 text-sm">Pool C</p>
                    <p className="text-xs text-purple-600">3 Teams</p>
                  </div>
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <p className="font-medium text-orange-800 text-sm">Pool D</p>
                    <p className="text-xs text-orange-600">3 Teams</p>
                  </div>
                  <div className="bg-red-100 p-2 rounded-lg">
                    <p className="font-medium text-red-800 text-sm">Pool E</p>
                    <p className="text-xs text-red-600">3 Teams</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">Pool F</p>
                    <p className="text-xs text-indigo-600">3 Teams</p>
                  </div>
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <p className="font-medium text-pink-800 text-sm">Pool G</p>
                    <p className="text-xs text-pink-600">3 Teams</p>
                  </div>
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <p className="font-medium text-teal-800 text-sm">Pool H</p>
                    <p className="text-xs text-teal-600">3 Teams</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Top 2 teams from each pool advance (16 teams total)
                </p>
              </div>
            </div>

            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>

            {/* Round of 16 */}
            <div className="flex justify-center mb-16">
              <div className="bg-indigo-50 rounded-xl p-5 w-full max-w-5xl text-center border-2 border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-3">
                  Round of 16
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-1</p>
                    <p className="text-xs text-indigo-600">A1 vs H2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-2</p>
                    <p className="text-xs text-indigo-600">B1 vs G2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-3</p>
                    <p className="text-xs text-indigo-600">C1 vs F2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-4</p>
                    <p className="text-xs text-indigo-600">D1 vs E2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-5</p>
                    <p className="text-xs text-indigo-600">E1 vs D2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-6</p>
                    <p className="text-xs text-indigo-600">F1 vs C2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-7</p>
                    <p className="text-xs text-indigo-600">G1 vs B2</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <p className="font-medium text-indigo-800 text-sm">R16-8</p>
                    <p className="text-xs text-indigo-600">H1 vs A2</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Winners advance to Quarter Finals (8 teams)
                </p>
              </div>
            </div>

            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>

            {/* Quarter Finals */}
            <div className="flex justify-center mb-16">
              <div className="bg-teal-50 rounded-xl p-5 w-full max-w-3xl text-center border-2 border-teal-200">
                <h4 className="font-semibold text-teal-800 mb-3">
                  Quarter Finals
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <p className="font-medium text-teal-800">QF 1</p>
                    <p className="text-xs text-teal-600">Winner R16-1 vs R16-2</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <p className="font-medium text-teal-800">QF 2</p>
                    <p className="text-xs text-teal-600">Winner R16-3 vs R16-4</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <p className="font-medium text-teal-800">QF 3</p>
                    <p className="text-xs text-teal-600">Winner R16-5 vs R16-6</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <p className="font-medium text-teal-800">QF 4</p>
                    <p className="text-xs text-teal-600">Winner R16-7 vs R16-8</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Winners advance to Semi Finals (4 teams)
                </p>
              </div>
            </div>

            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>

            {/* Semi Finals */}
            <div className="flex justify-center mb-16">
              <div className="bg-purple-50 rounded-xl p-5 w-full max-w-2xl text-center border-2 border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3">
                  Semi Finals
                </h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">SF 1</p>
                    <p className="text-xs text-purple-600">
                      Winner QF1 vs Winner QF3
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">SF 2</p>
                    <p className="text-xs text-purple-600">
                      Winner QF2 vs Winner QF4
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Winners advance to Finals
                </p>
              </div>
            </div>

            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>

            {/* Finals */}
            <div className="flex justify-center">
              <div className="bg-yellow-50 rounded-xl p-5 w-full max-w-md text-center border-2 border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Finals</h4>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="font-medium text-yellow-800">
                    Championship Match
                  </p>
                  <p className="text-xs text-yellow-600">
                    Winner SF1 vs Winner SF2
                  </p>
                  <div className="mt-3 flex justify-center">
                    <div className="bg-yellow-300 px-4 py-2 rounded-full text-yellow-800 font-bold">
                      Tournament Champion
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Progression Description */}
          <div className="mt-16 bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">
              Tournament Progression Rules
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  24 teams divided into 8 pools of 3 teams each
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Top 2 teams from each pool advance to Round of 16 (16 teams total)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Round of 16 winners advance to quarter-finals (8 teams)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Quarter-final winners advance to semi-finals (4 teams)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Semi-final winners advance to finals (2 teams)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Final winner is crowned tournament champion
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolsAndPoints;
