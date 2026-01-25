import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Admin credentials
const ADMIN_USERNAME = "anupbhai";
const ADMIN_PASSWORD = "nahibataunga";

interface KnockoutMatch {
  id?: number;
  stage: string;
  match_number: number;
  team1_id?: number;
  team1_name?: string;
  team1_players?: string[];
  team1_score?: number;
  team2_id?: number;
  team2_name?: string;
  team2_players?: string[];
  team2_score?: number;
  winner_id?: number;
  winner_name?: string;
  is_completed?: boolean;
  completed_at?: string;
}

interface CompletedGame {
  stage: string;
  match_number: number;
  team1_name: string;
  team2_name: string;
  team1_score: number;
  team2_score: number;
  winner_name: string;
}

const KnockoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Knockout matches state
  const [roundOf16, setRoundOf16] = useState<KnockoutMatch[]>([]);
  const [quarterFinals, setQuarterFinals] = useState<KnockoutMatch[]>([]);
  const [semiFinals, setSemiFinals] = useState<KnockoutMatch[]>([]);
  const [final, setFinal] = useState<KnockoutMatch[]>([]);
  
  // Completed games state
  const [completedGames, setCompletedGames] = useState<Map<string, CompletedGame>>(new Map());

  // Fetch knockout matches
  const fetchKnockoutMatches = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/knockout/matches");
      if (response.ok) {
        const data = await response.json();
        const matches = data.matches || [];
        
        setRoundOf16(matches.filter((m: KnockoutMatch) => m.stage === "round_of_16"));
        setQuarterFinals(matches.filter((m: KnockoutMatch) => m.stage === "quarter"));
        setSemiFinals(matches.filter((m: KnockoutMatch) => m.stage === "semi"));
        setFinal(matches.filter((m: KnockoutMatch) => m.stage === "final"));
      }
    } catch (error) {
      console.error("Error fetching knockout matches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch completed games
  const fetchCompletedGames = async () => {
    try {
      const response = await fetch("/api/knockout/completed");
      if (response.ok) {
        const data = await response.json();
        const gamesMap = new Map();
        
        data.completedGames?.forEach((game: CompletedGame) => {
          const key = `${game.stage}_${game.match_number}`;
          gamesMap.set(key, game);
        });
        
        setCompletedGames(gamesMap);
      }
    } catch (error) {
      console.error("Error fetching completed games:", error);
    }
  };

  useEffect(() => {
    fetchKnockoutMatches();
    fetchCompletedGames();
    // Initialize knockout stages if needed
    fetch("/api/knockout/initialize", { method: "POST" }).catch(console.error);
  }, []);

  // Check if a match is completed
  const isMatchCompleted = (stage: string, matchNumber: number): CompletedGame | null => {
    const key = `${stage}_${matchNumber}`;
    return completedGames.get(key) || null;
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

  // Update match
  const handleUpdateMatch = async (
    stage: string,
    matchNumber: number,
    field: string,
    value: any
  ) => {
    try {
      const response = await fetch("/api/knockout/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage,
          matchNumber,
          [field]: value,
        }),
      });

      if (response.ok) {
        fetchKnockoutMatches();
        fetchCompletedGames();
      }
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  // Start live score
  const startLiveScore = (stage: string, matchNumber: number) => {
    navigate(`/live-score?stage=${stage}&match=${matchNumber}`);
  };

  // Get stage display name
  const getStageName = (stage: string) => {
    const names: { [key: string]: string } = {
      round_of_16: "Round of 16",
      quarter: "Quarter-Finals",
      semi: "Semi-Finals",
      final: "Final",
    };
    return names[stage] || stage;
  };

  // Render a match card
  const renderMatchCard = (match: KnockoutMatch, isEditable: boolean) => {
    const gameResult = isMatchCompleted(match.stage, match.match_number);
    const isCompleted = !!gameResult || match.is_completed;
    
    return (
      <div
        key={`${match.stage}-${match.match_number}`}
        className={`bg-white rounded-lg shadow-md p-4 border-2 ${
          isCompleted ? "border-green-500" : "border-gray-200"
        }`}
      >
        <div className="text-center mb-3">
          <h4 className="font-bold text-gray-700 text-sm">
            Match {match.match_number}
          </h4>
        </div>
        
        <div className="space-y-3">
          {/* Team 1 */}
          <div className="flex items-center gap-2">
            {isEditable ? (
              <input
                type="text"
                className="flex-1 border-2 border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Team 1"
                value={match.team1_name || ""}
                onChange={(e) =>
                  handleUpdateMatch(match.stage, match.match_number, "team1Name", e.target.value)
                }
              />
            ) : (
              <div className="flex-1 font-semibold text-gray-800 text-sm">
                {match.team1_name || "TBD"}
              </div>
            )}
            {isEditable && (
              <input
                type="number"
                className="w-16 text-center border-2 border-gray-300 rounded px-1 py-1 text-sm font-bold focus:border-blue-500 focus:outline-none"
                placeholder="0"
                value={match.team1_score || 0}
                onChange={(e) =>
                  handleUpdateMatch(
                    match.stage,
                    match.match_number,
                    "team1Score",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            )}
            {!isEditable && isCompleted && (
              <div className="w-16 text-center font-bold text-blue-600 text-sm">
                {gameResult?.team1_score ?? match.team1_score ?? 0}
              </div>
            )}
          </div>

          <div className="text-center text-gray-400 text-xs">VS</div>

          {/* Team 2 */}
          <div className="flex items-center gap-2">
            {isEditable ? (
              <input
                type="text"
                className="flex-1 border-2 border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Team 2"
                value={match.team2_name || ""}
                onChange={(e) =>
                  handleUpdateMatch(match.stage, match.match_number, "team2Name", e.target.value)
                }
              />
            ) : (
              <div className="flex-1 font-semibold text-gray-800 text-sm">
                {match.team2_name || "TBD"}
              </div>
            )}
            {isEditable && (
              <input
                type="number"
                className="w-16 text-center border-2 border-gray-300 rounded px-1 py-1 text-sm font-bold focus:border-blue-500 focus:outline-none"
                placeholder="0"
                value={match.team2_score || 0}
                onChange={(e) =>
                  handleUpdateMatch(
                    match.stage,
                    match.match_number,
                    "team2Score",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            )}
            {!isEditable && isCompleted && (
              <div className="w-16 text-center font-bold text-blue-600 text-sm">
                {gameResult?.team2_score ?? match.team2_score ?? 0}
              </div>
            )}
          </div>

          {/* Winner display */}
          {isCompleted && (
            <div className="text-center mt-2">
              <span className="text-xs font-bold text-green-600">
                🏆 Winner: {gameResult?.winner_name ?? match.winner_name ?? "N/A"}
              </span>
            </div>
          )}

          {/* Live Score Button */}
          <div className="mt-3">
            <button
              onClick={() => startLiveScore(match.stage, match.match_number)}
              disabled={isCompleted || !match.team1_name || !match.team2_name || !isAuthenticated}
              className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${
                isCompleted || !match.team1_name || !match.team2_name || !isAuthenticated
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
              }`}
              title={
                !isAuthenticated
                  ? "Admin login required"
                  : !match.team1_name || !match.team2_name
                  ? "Set teams first"
                  : isCompleted
                  ? "Match completed"
                  : "Start live scoring"
              }
            >
              {isCompleted ? "✓ Completed" : "🎯 Live Score"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render a stage section
  const renderStage = (
    stage: string,
    matches: KnockoutMatch[],
    bgColor: string
  ) => {
    // Ensure we have the right number of matches
    const expectedMatches =
      stage === "round_of_16" ? 8 : stage === "quarter" ? 4 : stage === "semi" ? 2 : 1;
    
    const displayMatches = Array.from({ length: expectedMatches }, (_, i) => {
      const matchNumber = i + 1;
      const existingMatch = matches.find((m) => m.match_number === matchNumber);
      return (
        existingMatch || {
          stage,
          match_number: matchNumber,
          team1_name: "",
          team2_name: "",
          team1_score: 0,
          team2_score: 0,
          is_completed: false,
        }
      );
    });

    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <div className={`${bgColor} text-white py-3 sm:py-4 px-3 sm:px-4 font-bold text-base sm:text-lg`}>
          {getStageName(stage)}
        </div>
        <div className="p-4 sm:p-6">
          <div
            className={`grid gap-3 sm:gap-4 ${
              stage === "round_of_16"
                ? "grid-cols-2 sm:grid-cols-4"
                : stage === "quarter"
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {displayMatches.map((match) => renderMatchCard(match, isAuthenticated))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-4 sm:py-6 md:py-8 px-4 sm:px-6 shadow-xl">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-2">
            🏸 Knockout Stages 🏸
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-3 sm:mb-4">
            {isAuthenticated ? "Admin Mode" : "Tournament Bracket"}
          </h2>
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base flex-wrap">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/pools")}
                  className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
                >
                  ← Pools
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
                >
                  🔐 Admin Login
                </button>
                <button
                  onClick={() => {
                    fetchKnockoutMatches();
                    fetchCompletedGames();
                  }}
                  className="bg-white/30 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
                >
                  🔄 Refresh
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500/90 hover:bg-red-600 active:bg-red-700 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] text-sm sm:text-base"
              >
                🚪 Logout
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
            <p className="mt-4 text-gray-700 font-semibold">Loading knockout stages...</p>
          </div>
        </div>
      )}

      {/* Knockout Stages */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="space-y-6 sm:space-y-8">
          {renderStage("round_of_16", roundOf16, "bg-blue-600")}
          {renderStage("quarter", quarterFinals, "bg-green-600")}
          {renderStage("semi", semiFinals, "bg-purple-600")}
          {renderStage("final", final, "bg-yellow-600")}
        </div>

        {isAuthenticated && (
          <div className="text-center mt-6 sm:mt-8 text-blue-600 text-xs sm:text-sm px-2">
            <p className="bg-blue-50 border border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 inline-block font-semibold">
              ✏️ Admin Mode: Edit teams and scores directly. Click "Live Score" to start scoring!
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

export default KnockoutPage;
