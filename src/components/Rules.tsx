import React from "react";
import SectionTitle from "./SectionTitle";

const Rules: React.FC = () => {
  return (
    <section id="rules" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Tournament Rules</SectionTitle>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Match Rules
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  All BWF rules will be applicable
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  League matches: 21 points (golden point)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  QF and SF: One set of 21 points with deuce till 30
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Final: Best of 3 sets (21 points with deuce till 30)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Official tournament shuttlecocks will be provided (mavis 350)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Match officials' decisions are final
                </p>
              </li>

              {/* Enhanced Tie-Breaking Rule */}
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 mt-1 shadow-sm"></div>
                <div className="ml-3">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm">
                    <p className="text-gray-800 font-semibold mb-2">
                      🏆 League Stage Tie-Breaking Rule
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      <span className="font-bold text-blue-800">
                        If teams have equal wins
                      </span>{" "}
                      in the league stage, qualification to Quarter-Finals will
                      be determined by
                      <span className="font-bold text-blue-800">
                        {" "}
                        total points accumulated
                      </span>{" "}
                      throughout all league matches. The team with the{" "}
                      <span className="font-bold text-indigo-700">
                        highest cumulative score
                      </span>{" "}
                      advances to the knockout stage.
                    </p>
                    <div className="mt-2 flex items-center text-xs text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-medium">
                        Ensures fair progression based on overall performance
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">
              Tournament Format
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Maximum 32 players (16 teams)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 mt-1"></div>
                <p className="ml-3 text-gray-700">4 pools with 4 teams each</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Knockout stage from quarter-finals
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Partners selected via chit draw
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Teams divided randomly into pools
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
