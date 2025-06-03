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
                  Final: Best of 3 sets (21 points with deuce till 30)
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Official tournament shuttlecocks will be provided
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Match officials' decisions are final
                </p>
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

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Tournament Structure
            </h3>
            <div className="overflow-x-auto">
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Pool A</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-2 rounded">Team 1</div>
                      <div className="bg-white p-2 rounded">Team 2</div>
                      <div className="bg-white p-2 rounded">Team 3</div>
                      <div className="bg-white p-2 rounded">Team 4</div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Pool B</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-2 rounded">Team 5</div>
                      <div className="bg-white p-2 rounded">Team 6</div>
                      <div className="bg-white p-2 rounded">Team 7</div>
                      <div className="bg-white p-2 rounded">Team 8</div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Pool C</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-2 rounded">Team 9</div>
                      <div className="bg-white p-2 rounded">Team 10</div>
                      <div className="bg-white p-2 rounded">Team 11</div>
                      <div className="bg-white p-2 rounded">Team 12</div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Pool D</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-2 rounded">Team 13</div>
                      <div className="bg-white p-2 rounded">Team 14</div>
                      <div className="bg-white p-2 rounded">Team 15</div>
                      <div className="bg-white p-2 rounded">Team 16</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center items-center">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Knockout Stage
                    </h4>
                    <img
                      src="https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Badminton match"
                      className="max-w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <p className="text-sm text-gray-600">
                      Top teams from each pool advance to quarter-finals
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

export default Rules;
