import React from "react";
import SectionTitle from "./SectionTitle";

// Define the team data structure with player names
interface TeamData {
  name: string;
  players: string[];
  played: string;
  won: string;
  lost: string;
  points: string;
}

// Sample data for each pool - you'll need to replace with actual player names
const poolATeams: TeamData[] = [
  { name: "Team 1", players: ["Aditya", "Prathap"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 2", players: ["Shivam G", "Tanmay"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 3", players: ["Hemanth", "Sanjay"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 4", players: ["Rishav", "Mano"], played: "-", won: "-", lost: "-", points: "-" },
];

const poolBTeams: TeamData[] = [
  { name: "Team 1", players: ["Mohit", "Anurag"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 2", players: ["Piyush", "R Raju"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 3", players: ["Sushant", "Amit"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 4", players: ["Rahul", "Tushar"], played: "-", won: "-", lost: "-", points: "-" },
];

const poolCTeams: TeamData[] = [
  { name: "Team 1", players: ["Abhi", "Sumit"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 2", players: ["Dinesh", "Purushottam"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 3", players: ["Akash", "Nikhil"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 4", players: ["Ankit", "Vasudeva"], played: "-", won: "-", lost: "-", points: "-" },
];

const poolDTeams: TeamData[] = [
  { name: "Team 1", players: ["Shivam S", "Jay"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 2", players: ["Sarthak", "Mahendran"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 3", players: ["Bharath", "Shubham"], played: "-", won: "-", lost: "-", points: "-" },
  { name: "Team 4", players: ["Goutham", "Rinda"], played: "-", won: "-", lost: "-", points: "-" },
];

const PoolsAndPoints: React.FC = () => {
  // Function to render a pool table
  const renderPoolTable = (poolName: string, bgColor: string, teams: TeamData[], poolKey: string) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className={`${bgColor} text-white py-3 px-4 font-semibold`}>
        {poolName}
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Players</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teams.map((team, index) => (
            <tr key={`${poolKey}-${index + 1}`} className="hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-900">{team.name}</td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {team.players.join(" & ")}
              </td>
              <td className="py-3 px-4 text-sm text-gray-500 text-center">{team.played}</td>
              <td className="py-3 px-4 text-sm text-gray-500 text-center">{team.won}</td>
              <td className="py-3 px-4 text-sm text-gray-500 text-center">{team.lost}</td>
              <td className="py-3 px-4 text-sm text-gray-500 text-center">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section id="pools-points" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Pools & Points</SectionTitle>
        
        {/* Pool standings table with player names */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Pool Standings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pool A */}
            {renderPoolTable("Pool A", "bg-blue-600", poolATeams, "poolA")}
            
            {/* Pool B */}
            {renderPoolTable("Pool B", "bg-green-600", poolBTeams, "poolB")}
            
            {/* Pool C */}
            {renderPoolTable("Pool C", "bg-purple-600", poolCTeams, "poolC")}
            
            {/* Pool D */}
            {renderPoolTable("Pool D", "bg-orange-600", poolDTeams, "poolD")}
          </div>
        </div>
        
        {/* Tournament Progression Flowchart */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Tournament Progression</h3>
          
          <div className="relative">
            {/* Group Stage */}
            <div className="flex justify-center mb-16">
              <div className="bg-blue-50 rounded-xl p-5 w-full max-w-4xl text-center border-2 border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Group Stage</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="font-medium text-blue-800">Pool A</p>
                    <p className="text-sm text-blue-600">4 Teams</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="font-medium text-green-800">Pool B</p>
                    <p className="text-sm text-green-600">4 Teams</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">Pool C</p>
                    <p className="text-sm text-purple-600">4 Teams</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <p className="font-medium text-orange-800">Pool D</p>
                    <p className="text-sm text-orange-600">4 Teams</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Top 2 teams from each pool advance</p>
              </div>
            </div>
            
            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>
            
            {/* Quarter Finals */}
            <div className="flex justify-center mb-16">
              <div className="bg-indigo-50 rounded-xl p-5 w-full max-w-3xl text-center border-2 border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-3">Quarter Finals</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="font-medium text-indigo-800">QF 1</p>
                    <p className="text-xs text-indigo-600">A1 vs C2</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="font-medium text-indigo-800">QF 2</p>
                    <p className="text-xs text-indigo-600">C1 vs A2</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="font-medium text-indigo-800">QF 3</p>
                    <p className="text-xs text-indigo-600">B1 vs D2</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <p className="font-medium text-indigo-800">QF 4</p>
                    <p className="text-xs text-indigo-600">D1 vs B2</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Winners advance to Semi Finals</p>
              </div>
            </div>
            
            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>
            
            {/* Semi Finals */}
            <div className="flex justify-center mb-16">
              <div className="bg-purple-50 rounded-xl p-5 w-full max-w-2xl text-center border-2 border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3">Semi Finals</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">SF 1</p>
                    <p className="text-xs text-purple-600">Winner QF1 vs Winner QF3</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">SF 2</p>
                    <p className="text-xs text-purple-600">Winner QF2 vs Winner QF4</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">Winners advance to Finals</p>
              </div>
            </div>
            
            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>
            
            {/* Finals */}
            <div className="flex justify-center">
              <div className="bg-yellow-50 rounded-xl p-5 w-full max-w-md text-center border-2 border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Finals</h4>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="font-medium text-yellow-800">Championship Match</p>
                  <p className="text-xs text-yellow-600">Winner SF1 vs Winner SF2</p>
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
            <h4 className="font-semibold text-gray-800 mb-4">Tournament Progression Rules</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  16 teams divided into 4 pools of 4 teams each
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Top 2 teams from each pool advance to quarter-finals (8 teams total)
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