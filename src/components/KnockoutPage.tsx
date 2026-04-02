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

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Knockout matches state
  const [roundOf16, setRoundOf16] = useState<KnockoutMatch[]>([]);
  const [quarterFinals, setQuarterFinals] = useState<KnockoutMatch[]>([]);
  const [semiFinals, setSemiFinals] = useState<KnockoutMatch[]>([]);
  const [final, setFinal] = useState<KnockoutMatch[]>([]);
  
  // Completed games state
  const [completedGames, setCompletedGames] = useState<Map<string, CompletedGame>>(new Map());
  
  // Local edit state
  const [editedMatches, setEditedMatches] = useState<Map<string, Partial<KnockoutMatch>>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

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
      localStorage.setItem("adminAuthenticated", "true");
      setLoginError("");
      setShowLoginModal(false);
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setUsername("");
    setPassword("");
  };

  // Handle local input change (doesn't call API yet)
  const handleLocalChange = (
    stage: string,
    matchNumber: number,
    field: string,
    value: any
  ) => {
    const key = `${stage}_${matchNumber}`;
    
    // Get current match to preserve other values
    let currentMatch: KnockoutMatch | undefined;
    if (stage === "round_of_16") currentMatch = roundOf16.find(m => m.match_number === matchNumber);
    else if (stage === "quarter") currentMatch = quarterFinals.find(m => m.match_number === matchNumber);
    else if (stage === "semi") currentMatch = semiFinals.find(m => m.match_number === matchNumber);
    else if (stage === "final") currentMatch = final.find(m => m.match_number === matchNumber);
    
    const currentEdits = editedMatches.get(key) || { ...currentMatch };
    const updatedEdits = new Map(editedMatches);
    updatedEdits.set(key, { ...currentEdits, [field]: value, stage, match_number: matchNumber });
    setEditedMatches(updatedEdits);
  };

  // Save all edited matches
  const saveAllChanges = async () => {
    if (editedMatches.size === 0) return;
    
    try {
      setIsSaving(true);
      
      // Save all edited matches in parallel
      const savePromises = Array.from(editedMatches.values()).map(async (edits) => {
        // Convert field names to camelCase for API
        // Note: Scores are read-only and can only be updated via live scoring
        const apiData: any = {
          stage: edits.stage,
          matchNumber: edits.match_number,
        };
        
        // Only allow editing team names, not scores
        if ('team1_name' in edits) apiData.team1Name = edits.team1_name;
        if ('team2_name' in edits) apiData.team2Name = edits.team2_name;
        // Scores are intentionally excluded - they can only be updated via live scoring
        
        const response = await fetch("/api/knockout/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to update match ${edits.stage} ${edits.match_number}`);
        }
      });

      await Promise.all(savePromises);
      
      // Clear edited state and refresh
      setEditedMatches(new Map());
      await fetchKnockoutMatches();
      await fetchCompletedGames();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save some changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Discard unsaved changes
  const discardChanges = () => {
    setEditedMatches(new Map());
  };

  // Get display value (edited or original)
  const getDisplayValue = (match: KnockoutMatch, field: string): any => {
    const key = `${match.stage}_${match.match_number}`;
    const edits = editedMatches.get(key);
    if (edits && field in edits) {
      return (edits as any)[field];
    }
    return (match as any)[field];
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
        className={`bg-white rounded-lg shadow-md p-3 sm:p-4 border-2 ${
          isCompleted ? "border-green-500" : "border-gray-200"
        }`}
      >
        <div className="text-center mb-2 sm:mb-3">
          <h4 className="font-bold text-gray-700 text-sm sm:text-base">
            Match {match.match_number}
          </h4>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {/* Team 1 */}
          <div className="flex items-center gap-2">
            {isEditable ? (
              <input
                type="text"
                className="flex-1 min-w-0 border-2 border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="Team 1"
                value={getDisplayValue(match, "team1_name") || ""}
                onChange={(e) =>
                  handleLocalChange(match.stage, match.match_number, "team1_name", e.target.value)
                }
              />
            ) : (
              <div className="flex-1 min-w-0 font-semibold text-gray-800 text-sm sm:text-base truncate">
                {match.team1_name || "TBD"}
              </div>
            )}
            {/* Score display - always read-only, even in admin mode */}
            {(isCompleted || match.team1_score !== undefined) && (
              <div className="w-14 sm:w-16 text-center font-bold text-blue-600 text-sm sm:text-base">
                {gameResult?.team1_score ?? match.team1_score ?? 0}
              </div>
            )}
          </div>

          <div className="text-center text-gray-400 text-xs font-semibold">VS</div>

          {/* Team 2 */}
          <div className="flex items-center gap-2">
            {isEditable ? (
              <input
                type="text"
                className="flex-1 min-w-0 border-2 border-gray-300 rounded px-2 py-2 text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                placeholder="Team 2"
                value={getDisplayValue(match, "team2_name") || ""}
                onChange={(e) =>
                  handleLocalChange(match.stage, match.match_number, "team2_name", e.target.value)
                }
              />
            ) : (
              <div className="flex-1 min-w-0 font-semibold text-gray-800 text-sm sm:text-base truncate">
                {match.team2_name || "TBD"}
              </div>
            )}
            {/* Score display - always read-only, even in admin mode */}
            {(isCompleted || match.team2_score !== undefined) && (
              <div className="w-14 sm:w-16 text-center font-bold text-blue-600 text-sm sm:text-base">
                {gameResult?.team2_score ?? match.team2_score ?? 0}
              </div>
            )}
          </div>

          {/* Winner display */}
          {isCompleted && (
            <div className="text-center mt-1 sm:mt-2">
              <span className="text-xs sm:text-sm font-bold text-green-600 break-words">
                🏆 {gameResult?.winner_name ?? match.winner_name ?? "N/A"}
              </span>
            </div>
          )}

          {/* Live Score Button */}
          <div className="mt-2 sm:mt-3">
            <button
              onClick={() => startLiveScore(match.stage, match.match_number)}
              disabled={isCompleted || !match.team1_name || !match.team2_name || !isAuthenticated}
              className={`w-full py-2.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all min-h-[44px] sm:min-h-0 ${
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
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : stage === "quarter"
                ? "grid-cols-1 sm:grid-cols-2"
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
          <>
            {editedMatches.size > 0 && (
              <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm bg-white rounded-lg shadow-2xl p-3 sm:p-4 border-2 border-blue-500 z-50">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  {editedMatches.size} unsaved change{editedMatches.size > 1 ? "s" : ""}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={discardChanges}
                    disabled={isSaving}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all text-sm min-h-[44px] sm:min-h-0"
                  >
                    Discard
                  </button>
                  <button
                    onClick={saveAllChanges}
                    disabled={isSaving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all text-sm min-h-[44px] sm:min-h-0"
                  >
                    {isSaving ? "Saving..." : "Save All"}
                  </button>
                </div>
              </div>
            )}
            <div className="text-center mt-6 sm:mt-8 text-blue-600 text-xs sm:text-sm px-2">
              <p className="bg-blue-50 border border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 inline-block font-semibold">
                ✏️ Admin Mode: Edit teams and scores, then click "Save All" to update!
              </p>
            </div>
          </>
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
            Shuttle Showdown 5.0 - April 26, 2026, Sunday
          </p>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">RAMs Sports Arena</p>
        </div>
      </div>
    </div>
  );
};

export default KnockoutPage;
