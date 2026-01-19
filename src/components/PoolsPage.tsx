import React, { useState, useEffect } from "react";

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

const PoolsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Team data state for all 8 pools
  const [poolATeams, setPoolATeams] = useState<TeamData[]>([]);
  const [poolBTeams, setPoolBTeams] = useState<TeamData[]>([]);
  const [poolCTeams, setPoolCTeams] = useState<TeamData[]>([]);
  const [poolDTeams, setPoolDTeams] = useState<TeamData[]>([]);
  const [poolETeams, setPoolETeams] = useState<TeamData[]>([]);
  const [poolFTeams, setPoolFTeams] = useState<TeamData[]>([]);
  const [poolGTeams, setPoolGTeams] = useState<TeamData[]>([]);
  const [poolHTeams, setPoolHTeams] = useState<TeamData[]>([]);

  // Fetch team data from Neon database
  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setPoolATeams(data.poolATeams || []);
        setPoolBTeams(data.poolBTeams || []);
        setPoolCTeams(data.poolCTeams || []);
        setPoolDTeams(data.poolDTeams || []);
        setPoolETeams(data.poolETeams || []);
        setPoolFTeams(data.poolFTeams || []);
        setPoolGTeams(data.poolGTeams || []);
        setPoolHTeams(data.poolHTeams || []);
        setLastUpdated(new Date());
      } else {
        console.error("Failed to fetch team data");
        loadDefaultData();
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      loadDefaultData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load default data immediately to prevent undefined errors
    loadDefaultData();
    // Then fetch real data
    fetchTeamData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTeamData();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load default data as fallback
  const loadDefaultData = () => {
    const createDefaultTeams = (startPlayer: number) => [
      {
        name: "Team 1",
        players: [`Player ${startPlayer}`, `Player ${startPlayer + 1}`],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 2",
        players: [`Player ${startPlayer + 2}`, `Player ${startPlayer + 3}`],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
      {
        name: "Team 3",
        players: [`Player ${startPlayer + 4}`, `Player ${startPlayer + 5}`],
        played: "-",
        won: "-",
        lost: "-",
        points: "-",
        qualified: false,
      },
    ];

    setPoolATeams(createDefaultTeams(1));
    setPoolBTeams(createDefaultTeams(7));
    setPoolCTeams(createDefaultTeams(13));
    setPoolDTeams(createDefaultTeams(19));
    setPoolETeams(createDefaultTeams(25));
    setPoolFTeams(createDefaultTeams(31));
    setPoolGTeams(createDefaultTeams(37));
    setPoolHTeams(createDefaultTeams(43));
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

    const updatePool = (setter: React.Dispatch<React.SetStateAction<TeamData[]>>) => {
      setter((teams) =>
        teams.map((team, index) => {
          if (index === teamIndex) {
            updatedTeam = { ...team, [field]: value };
            return updatedTeam;
          }
          return team;
        })
      );
    };

    switch (poolKey) {
      case "poolA": updatePool(setPoolATeams); break;
      case "poolB": updatePool(setPoolBTeams); break;
      case "poolC": updatePool(setPoolCTeams); break;
      case "poolD": updatePool(setPoolDTeams); break;
      case "poolE": updatePool(setPoolETeams); break;
      case "poolF": updatePool(setPoolFTeams); break;
      case "poolG": updatePool(setPoolGTeams); break;
      case "poolH": updatePool(setPoolHTeams); break;
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

  // Function to render an editable pool table (for admin)
  const renderEditablePoolTable = (
    poolName: string,
    bgColor: string,
    teams: TeamData[],
    poolKey: string
  ) => (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      <div className={`${bgColor} text-white py-3 sm:py-4 px-3 sm:px-4 font-bold text-base sm:text-lg`}>
        {poolName}
      </div>
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase sticky left-0 bg-gray-100 z-10">
                Team
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Players
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                P
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                W
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                L
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Pts
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Qualified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams && teams.length > 0 ? teams.map((team, index) => (
              <tr
                key={`${poolKey}-${index + 1}`}
                className={`hover:bg-gray-50 transition-colors ${
                  team.qualified ? "bg-green-50" : ""
                }`}
              >
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-sm sm:text-base font-semibold text-gray-900 sticky left-0 bg-white z-10">
                  {team.name}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-xs sm:text-sm text-gray-700">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">
                    {team.players.join(" & ")}
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-12 sm:w-14 text-center border-2 border-gray-300 rounded px-1 sm:px-2 py-1 sm:py-2 font-bold focus:border-blue-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
                    value={team.played}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "played", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-12 sm:w-14 text-center border-2 border-gray-300 rounded px-1 sm:px-2 py-1 sm:py-2 font-bold focus:border-green-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
                    value={team.won}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "won", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-12 sm:w-14 text-center border-2 border-gray-300 rounded px-1 sm:px-2 py-1 sm:py-2 font-bold focus:border-red-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
                    value={team.lost}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "lost", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-14 sm:w-16 text-center border-2 border-gray-300 rounded px-1 sm:px-2 py-1 sm:py-2 font-bold text-base sm:text-lg focus:border-blue-500 focus:outline-none min-h-[44px]"
                    value={team.points}
                    onChange={(e) =>
                      handleUpdateTeam(poolKey, index, "points", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  <button
                    onClick={() =>
                      toggleQualified(poolKey, index, team.qualified)
                    }
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-bold transition-all active:scale-95 min-h-[44px] min-w-[80px] sm:min-w-[100px] ${
                      team.qualified
                        ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
                        : "bg-green-500 hover:bg-green-600 active:bg-green-700"
                    }`}
                  >
                    {team.qualified ? "Unqualify" : "Qualify"}
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No teams data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Function to render a pool table (read-only)
  const renderPoolTable = (
    poolName: string,
    bgColor: string,
    teams: TeamData[],
    poolKey: string
  ) => (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      <div className={`${bgColor} text-white py-3 sm:py-4 px-3 sm:px-4 font-bold text-base sm:text-lg`}>
        {poolName}
      </div>
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full min-w-[560px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase sticky left-0 bg-gray-100 z-10">
                Team
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Players
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                P
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                W
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                L
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Pts
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-3 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams && teams.length > 0 ? teams.map((team, index) => (
              <tr
                key={`${poolKey}-${index + 1}`}
                className={`hover:bg-gray-50 transition-colors ${
                  team.qualified ? "bg-green-50" : ""
                }`}
              >
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-sm sm:text-base font-semibold text-gray-900 sticky left-0 bg-white z-10">
                  {team.name}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-xs sm:text-sm text-gray-700">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">
                    {team.players.join(" & ")}
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-sm sm:text-base font-bold text-gray-900 text-center">
                  {team.played}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-sm sm:text-base font-bold text-green-600 text-center">
                  {team.won}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-sm sm:text-base font-bold text-red-600 text-center">
                  {team.lost}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-base sm:text-lg font-bold text-blue-600 text-center">
                  {team.points}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-3 text-center">
                  {team.qualified ? (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-green-100 text-green-800 border-2 border-green-500 whitespace-nowrap">
                      ✓ <span className="hidden sm:inline">Qualified</span>
                    </span>
                  ) : null}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No teams data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-4 sm:py-6 md:py-8 px-4 sm:px-6 shadow-xl">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-2">
            🏸 Shuttle Showdown 4.0 🏸
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-3 sm:mb-4">
            {isAuthenticated ? "Pool Standings - Admin Mode" : "Pool Standings - Live Updates"}
          </h2>
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-center min-w-[140px] sm:min-w-auto">
              <span className="font-semibold hidden sm:inline">Last Updated: </span>
              <span className="font-semibold sm:hidden">Updated: </span>
              <span className="text-xs sm:text-sm">{lastUpdated.toLocaleTimeString()}</span>
            </div>
            {!isAuthenticated && (
              <button
                onClick={fetchTeamData}
                className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
              >
                🔄 <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
            {!isAuthenticated ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
              >
                🔐 <span className="hidden xs:inline">Admin</span><span className="hidden sm:inline"> Login</span>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500/90 hover:bg-red-600 active:bg-red-700 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
              >
                🚪 <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-semibold">Loading pools...</p>
          </div>
        </div>
      )}

      {/* Pool Standings */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {isAuthenticated ? (
            <>
              {renderEditablePoolTable("Pool A", "bg-blue-600", poolATeams, "poolA")}
              {renderEditablePoolTable("Pool B", "bg-green-600", poolBTeams, "poolB")}
              {renderEditablePoolTable("Pool C", "bg-purple-600", poolCTeams, "poolC")}
              {renderEditablePoolTable("Pool D", "bg-orange-600", poolDTeams, "poolD")}
              {renderEditablePoolTable("Pool E", "bg-red-600", poolETeams, "poolE")}
              {renderEditablePoolTable("Pool F", "bg-indigo-600", poolFTeams, "poolF")}
              {renderEditablePoolTable("Pool G", "bg-pink-600", poolGTeams, "poolG")}
              {renderEditablePoolTable("Pool H", "bg-teal-600", poolHTeams, "poolH")}
            </>
          ) : (
            <>
              {renderPoolTable("Pool A", "bg-blue-600", poolATeams, "poolA")}
              {renderPoolTable("Pool B", "bg-green-600", poolBTeams, "poolB")}
              {renderPoolTable("Pool C", "bg-purple-600", poolCTeams, "poolC")}
              {renderPoolTable("Pool D", "bg-orange-600", poolDTeams, "poolD")}
              {renderPoolTable("Pool E", "bg-red-600", poolETeams, "poolE")}
              {renderPoolTable("Pool F", "bg-indigo-600", poolFTeams, "poolF")}
              {renderPoolTable("Pool G", "bg-pink-600", poolGTeams, "poolG")}
              {renderPoolTable("Pool H", "bg-teal-600", poolHTeams, "poolH")}
            </>
          )}
        </div>

        {/* Tournament Info */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
            📋 Tournament Format
          </h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">Pool Stage</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                <li>• 24 teams divided into 8 pools</li>
                <li>• 3 teams per pool</li>
                <li>• Round-robin format within each pool</li>
                <li>• Top 2 teams from each pool qualify</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-purple-900 mb-2 sm:mb-3 text-sm sm:text-base">Knockout Stage</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                <li>• Round of 16: 16 qualified teams</li>
                <li>• Quarter-Finals: 8 teams</li>
                <li>• Semi-Finals: 4 teams</li>
                <li>• Finals: Best 2 teams</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auto-refresh notice */}
        {!isAuthenticated && (
          <div className="text-center mt-4 sm:mt-6 text-gray-600 text-xs sm:text-sm px-2">
            <p className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 inline-block">
              ⚡ <span className="hidden xs:inline">This page</span> Auto-refreshes every 30s
            </p>
          </div>
        )}
        {isAuthenticated && (
          <div className="text-center mt-4 sm:mt-6 text-blue-600 text-xs sm:text-sm px-2">
            <p className="bg-blue-50 border border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 inline-block font-semibold">
              ✏️ <span className="hidden sm:inline">Admin Mode:</span> Edit scores <span className="hidden sm:inline">directly</span> in tables<span className="hidden sm:inline">. Changes saved automatically</span>!
            </p>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative">
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

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm sm:text-base md:text-lg font-semibold">
            Shuttle Showdown 4.0 - January 31, 2026
          </p>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">RAMs Sports Arena</p>
        </div>
      </div>
    </div>
  );
};

export default PoolsPage;
