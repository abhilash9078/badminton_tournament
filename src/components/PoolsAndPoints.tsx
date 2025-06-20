import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";

// Define the team data structure with player names
interface TeamData {
  name: string;
  players: string[];
  played: string;
  won: string;
  lost: string;
  points: string;
  qualified?: boolean;
}

// Admin credentials
const ADMIN_USERNAME = "anupbhai";
const ADMIN_PASSWORD = "nahibataunga";

const PoolsAndPoints: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Team data state
  const [poolATeams, setPoolATeams] = useState<TeamData[]>([]);
  const [poolBTeams, setPoolBTeams] = useState<TeamData[]>([]);
  const [poolCTeams, setPoolCTeams] = useState<TeamData[]>([]);
  const [poolDTeams, setPoolDTeams] = useState<TeamData[]>([]);

  // Fetch team data from Neon database
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/teams");
        if (response.ok) {
          const data = await response.json();
          setPoolATeams(data.poolATeams);
          setPoolBTeams(data.poolBTeams);
          setPoolCTeams(data.poolCTeams);
          setPoolDTeams(data.poolDTeams);
        } else {
          console.error("Failed to fetch team data");
          // Load default data if API fails
          loadDefaultData();
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        // Load default data if API fails
        loadDefaultData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Load default data as fallback
  const loadDefaultData = () => {
    setPoolATeams([
      {
        name: "Team 1",
        players: ["Player 1", "Player 2"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 2",
        players: ["Player 3", "Player 4"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 3",
        players: ["Player 5", "Player 6"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 4",
        players: ["Player 7", "Player 8"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
    ]);

    setPoolBTeams([
      {
        name: "Team 1",
        players: ["Player 9", "Player 10"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 2",
        players: ["Player 11", "Player 12"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 3",
        players: ["Player 13", "Player 14"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 4",
        players: ["Player 15", "Player 16"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
    ]);

    setPoolCTeams([
      {
        name: "Team 1",
        players: ["Player 17", "Player 18"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 2",
        players: ["Player 19", "Player 20"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 3",
        players: ["Player 21", "Player 22"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 4",
        players: ["Player 23", "Player 24"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
    ]);

    setPoolDTeams([
      {
        name: "Team 1",
        players: ["Player 25", "Player 26"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 2",
        players: ["Player 27", "Player 28"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 3",
        players: ["Player 29", "Player 30"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 4",
        players: ["Player 31", "Player 32"],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
    ]);
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
      setShowLoginModal(false);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Handle team data update
  const handleUpdateTeam = async (
    poolKey: string,
    teamIndex: number,
    field: keyof TeamData,
    value: string | boolean
  ) => {
    // Update local state first for immediate UI feedback
    let updatedTeam: TeamData | null = null;

    switch (poolKey) {
      case "poolA":
        setPoolATeams((teams) =>
          teams.map((team, index) => {
            if (index === teamIndex) {
              updatedTeam = { ...team, [field]: value };
              return updatedTeam;
            }
            return team;
          })
        );
        break;
      case "poolB":
        setPoolBTeams((teams) =>
          teams.map((team, index) => {
            if (index === teamIndex) {
              updatedTeam = { ...team, [field]: value };
              return updatedTeam;
            }
            return team;
          })
        );
        break;
      case "poolC":
        setPoolCTeams((teams) =>
          teams.map((team, index) => {
            if (index === teamIndex) {
              updatedTeam = { ...team, [field]: value };
              return updatedTeam;
            }
            return team;
          })
        );
        break;
      case "poolD":
        setPoolDTeams((teams) =>
          teams.map((team, index) => {
            if (index === teamIndex) {
              updatedTeam = { ...team, [field]: value };
              return updatedTeam;
            }
            return team;
          })
        );
        break;
    }

    // Send update to the API
    if (updatedTeam) {
      try {
        const response = await fetch("/api/teams/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            poolKey,
            teamIndex,
            team: updatedTeam,
          }),
        });

        if (!response.ok) {
          console.error("Failed to update team data");
        }
      } catch (error) {
        console.error("Error updating team data:", error);
      }
    }
  };

  // Toggle team qualification status
  const toggleQualified = (
    poolKey: string,
    teamIndex: number,
    currentValue: boolean = false
  ) => {
    handleUpdateTeam(poolKey, teamIndex, "qualified", !currentValue);
  };

  // Function to render a pool table (read-only mode)
  // Update the renderPoolTable function for better mobile responsiveness
  const renderPoolTable = (
    poolName: string,
    bgColor: string,
    teams: TeamData[],
    poolKey: string
  ) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      <div className={`${bgColor} text-white py-3 px-4 font-semibold`}>
        {poolName}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Players
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                P
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                W
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                L
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pts
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.map((team, index) => (
              <tr
                key={`${poolKey}-${index + 1}`}
                className={`hover:bg-gray-50 ${
                  team.qualified ? "bg-green-50" : ""
                }`}
              >
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-900">
                  {team.name}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-600">
                  {team.players.join(" & ")}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  {team.played}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  {team.won}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  {team.lost}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  {team.points}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-center">
                  {team.qualified ? (
                    <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Qualified
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Update the renderEditablePoolTable function for better mobile responsiveness
  const renderEditablePoolTable = (
    poolName: string,
    bgColor: string,
    teams: TeamData[],
    poolKey: string
  ) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className={`${bgColor} text-white py-3 px-4 font-semibold`}>
        {poolName}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Players
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                P
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                W
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                L
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pts
              </th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qualified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.map((team, index) => (
              <tr
                key={`${poolKey}-${index + 1}`}
                className={`hover:bg-gray-50 ${
                  team.qualified ? "bg-green-50" : ""
                }`}
              >
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-900">
                  {team.name}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-600">
                  {team.players.join(" & ")}
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  <input
                    type="text"
                    className="w-10 sm:w-12 text-center border rounded p-1"
                    value={team.played}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "played", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  <input
                    type="text"
                    className="w-10 sm:w-12 text-center border rounded p-1"
                    value={team.won}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "won", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  <input
                    type="text"
                    className="w-10 sm:w-12 text-center border rounded p-1"
                    value={team.lost}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "lost", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-gray-500 text-center">
                  <input
                    type="text"
                    className="w-10 sm:w-12 text-center border rounded p-1"
                    value={team.points}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "points", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-2 sm:px-4 text-sm text-center">
                  <button
                    onClick={() =>
                      toggleQualified(poolKey, index, team.qualified)
                    }
                    className={`px-2 sm:px-3 py-1 rounded text-white text-xs sm:text-sm font-medium ${
                      team.qualified
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {team.qualified ? "Unqualify" : "Qualify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <section id="pools-points" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Pools & Points</SectionTitle>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  // Render admin panel if authenticated
  if (isAuthenticated) {
    return (
      <section id="pools-points" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Update Pool Standings
              </h3>

              {renderEditablePoolTable(
                "Pool A",
                "bg-blue-600",
                poolATeams,
                "poolA"
              )}
              {renderEditablePoolTable(
                "Pool B",
                "bg-green-600",
                poolBTeams,
                "poolB"
              )}
              {renderEditablePoolTable(
                "Pool C",
                "bg-purple-600",
                poolCTeams,
                "poolC"
              )}
              {renderEditablePoolTable(
                "Pool D",
                "bg-orange-600",
                poolDTeams,
                "poolD"
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Regular view with login modal
  return (
    <section id="pools-points" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Pools & Points</SectionTitle>

        {/* Admin Login Button */}
        <div className="max-w-5xl mx-auto mb-8 flex justify-end">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded text-sm"
            onClick={() => setShowLoginModal(true)}
          >
            Admin Login
          </button>
        </div>

        {/* Pool standings table with player names */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Pool Standings
          </h3>

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
                <p className="mt-3 text-sm text-gray-600">
                  Top 2 teams from each pool advance
                </p>
              </div>
            </div>

            {/* Connecting Lines - Vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-12 w-1 bg-gray-300 -mt-16"></div>

            {/* Quarter Finals */}
            <div className="flex justify-center mb-16">
              <div className="bg-indigo-50 rounded-xl p-5 w-full max-w-3xl text-center border-2 border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-3">
                  Quarter Finals
                </h4>
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
                <p className="mt-3 text-sm text-gray-600">
                  Winners advance to Semi Finals
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
                  16 teams divided into 4 pools of 4 teams each
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1"></div>
                <p className="ml-3 text-gray-700">
                  Top 2 teams from each pool advance to quarter-finals (8 teams
                  total)
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowLoginModal(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Admin Login
            </h2>

            {loginError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <span className="block sm:inline">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PoolsAndPoints;
