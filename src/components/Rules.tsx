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
                      Last Tournament Winners
                    </h4>
                    <img
                      src="/images/image_3.jpeg"
                      alt="Last winners - Himanshu and Surya"
                      className="max-w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <p className="text-sm text-gray-600 italic">
                      "Success in doubles is about trust and communication. We
                      won because we played as one." - Himanshu & Surya
                    </p>
                  </div>
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
                      <p className="text-sm text-gray-600 mt-1">
                        Bronze Medal Winners
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center mt-3">
                      <p className="font-medium">Ankit & Anurag</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Bronze Medal Winners
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Tournament Podium - All Finalists
                  </h4>
                  <img
                    src="/images/image_4.jpeg"
                    alt="All tournament finalists"
                    className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                  />
                  <p className="text-sm text-gray-600 mt-3">
                    Winners, Runners-up, and Semifinalists celebrating their
                    achievements
                  </p>
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
                          <p>Abhilash Meher (Chief Referee)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Amol Srivastava</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>DK</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Arijit</p>
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
                      src="/images/image_rf.jpeg"
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

export default Rules;
