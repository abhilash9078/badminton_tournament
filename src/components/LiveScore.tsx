import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface TeamData {
  name: string;
  players: string[];
  played: string;
  won: string;
  lost: string;
  points: string;
  qualified?: boolean;
}

const WINNING_SCORE = 21;

const LiveScore: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if this is a knockout match or pool match
  const stage = searchParams.get("stage") || "";
  const matchNumber = parseInt(searchParams.get("match") || "0");
  const poolKey = searchParams.get("pool") || "";
  const team1Index = parseInt(searchParams.get("team1") || "0");
  const team2Index = parseInt(searchParams.get("team2") || "1");
  
  const isKnockout = !!stage && matchNumber > 0;
  
  const [team1, setTeam1] = useState<TeamData | null>(null);
  const [team2, setTeam2] = useState<TeamData | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stageName, setStageName] = useState("");

  // Generate unique game key for localStorage
  const gameKey = isKnockout 
    ? `liveScore_knockout_${stage}_${matchNumber}`
    : `liveScore_${poolKey}_${team1Index}_${team2Index}`;

  // Load persisted score from localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem(gameKey);
    if (savedGame) {
      try {
        const gameData = JSON.parse(savedGame);
        setTeam1Score(gameData.team1Score || 0);
        setTeam2Score(gameData.team2Score || 0);
        setGameComplete(gameData.gameComplete || false);
        setWinner(gameData.winner || null);
      } catch (error) {
        console.error("Error loading saved game:", error);
      }
    }
  }, [gameKey]);

  // Fetch team data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        
        if (isKnockout) {
          // Fetch knockout match data
          const response = await fetch(`/api/knockout/matches?stage=${stage}`);
          if (response.ok) {
            const data = await response.json();
            const match = data.matches?.find((m: any) => m.match_number === matchNumber);
            
            if (match && match.team1_name && match.team2_name) {
              setTeam1({
                name: match.team1_name,
                players: match.team1_players || [],
                played: "-",
                won: "-",
                lost: "-",
                points: "-",
              });
              setTeam2({
                name: match.team2_name,
                players: match.team2_players || [],
                played: "-",
                won: "-",
                lost: "-",
                points: "-",
              });
              setTeam1Score(match.team1_score || 0);
              setTeam2Score(match.team2_score || 0);
              
              // Set stage name
              const stageNames: { [key: string]: string } = {
                round_of_16: "Round of 16",
                quarter: "Quarter-Finals",
                semi: "Semi-Finals",
                final: "Final",
              };
              setStageName(stageNames[stage] || stage);
            }
          }
        } else {
          // Fetch pool team data
          const response = await fetch("/api/teams");
          if (response.ok) {
            const data = await response.json();
            const poolKeyMap: { [key: string]: string } = {
              poolA: "poolATeams",
              poolB: "poolBTeams",
              poolC: "poolCTeams",
              poolD: "poolDTeams",
              poolE: "poolETeams",
              poolF: "poolFTeams",
              poolG: "poolGTeams",
              poolH: "poolHTeams",
            };
            
            const teams = data[poolKeyMap[poolKey]] || [];
            if (teams[team1Index] && teams[team2Index]) {
              setTeam1(teams[team1Index]);
              setTeam2(teams[team2Index]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isKnockout && stage && matchNumber) {
      fetchTeams();
    } else if (poolKey && team1Index !== null && team2Index !== null) {
      fetchTeams();
    }
  }, [isKnockout, stage, matchNumber, poolKey, team1Index, team2Index]);

  // Check for winner
  useEffect(() => {
    if (gameComplete) return; // Don't check again if game is already complete
    
    if (team1Score >= WINNING_SCORE && team1Score > team2Score) {
      const winnerName = team1?.name || "Team 1";
      setGameComplete(true);
      setWinner(winnerName);
      // Update localStorage with game complete state
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score,
        team2Score,
        gameComplete: true,
        winner: winnerName
      }));
      handleGameComplete();
    } else if (team2Score >= WINNING_SCORE && team2Score > team1Score) {
      const winnerName = team2?.name || "Team 2";
      setGameComplete(true);
      setWinner(winnerName);
      // Update localStorage with game complete state
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score,
        team2Score,
        gameComplete: true,
        winner: winnerName
      }));
      handleGameComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team1Score, team2Score, team1, team2, gameKey]);

  const handleGameComplete = async () => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      
      if (isKnockout) {
        // Update knockout match
        const response = await fetch("/api/knockout/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stage,
            matchNumber,
            team1Score,
            team2Score,
            gameComplete: true,
          }),
        });

        if (!response.ok) {
          console.error("Failed to update knockout game results");
        } else {
          localStorage.removeItem(gameKey);
        }
      } else {
        // Update pool match
        const response = await fetch("/api/teams/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            poolKey,
            team1Index,
            team2Index,
            team1Score,
            team2Score,
            gameComplete: true,
          }),
        });

        if (!response.ok) {
          console.error("Failed to update game results");
        } else {
          localStorage.removeItem(gameKey);
        }
      }
    } catch (error) {
      console.error("Error updating game results:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateScore = (team: 1 | 2, delta: number) => {
    if (gameComplete) return;
    
    if (team === 1) {
      const newScore = Math.max(0, team1Score + delta);
      setTeam1Score(newScore);
      // Persist to localStorage
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score: newScore,
        team2Score,
        gameComplete: false,
        winner: null
      }));
      
      // Update knockout match score in real-time
      if (isKnockout) {
        fetch("/api/knockout/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stage,
            matchNumber,
            team1Score: newScore,
            team2Score,
            gameComplete: false,
          }),
        }).catch(console.error);
      }
    } else {
      const newScore = Math.max(0, team2Score + delta);
      setTeam2Score(newScore);
      // Persist to localStorage
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score,
        team2Score: newScore,
        gameComplete: false,
        winner: null
      }));
      
      // Update knockout match score in real-time
      if (isKnockout) {
        fetch("/api/knockout/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stage,
            matchNumber,
            team1Score,
            team2Score: newScore,
            gameComplete: false,
          }),
        }).catch(console.error);
      }
    }
  };

  const resetGame = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setGameComplete(false);
    setWinner(null);
    // Clear localStorage
    localStorage.removeItem(gameKey);
  };

  const getPoolName = (key: string) => {
    const poolNames: { [key: string]: string } = {
      poolA: "Pool A",
      poolB: "Pool B",
      poolC: "Pool C",
      poolD: "Pool D",
      poolE: "Pool E",
      poolF: "Pool F",
      poolG: "Pool G",
      poolH: "Pool H",
    };
    return poolNames[key] || key;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-semibold text-center">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!team1 || !team2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load team data.</p>
          <button
            onClick={() => navigate(isKnockout ? "/knockout" : "/pools")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Back {isKnockout ? "to Knockout" : "to Pools"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-4 sm:py-6 px-4 sm:px-6 shadow-xl">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(isKnockout ? "/knockout" : "/pools")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 min-h-[44px] flex items-center gap-2"
            >
              <span>←</span>
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-center flex-1">
              🏸 Live Scoring
            </h1>
            <div className="w-20 sm:w-24"></div> {/* Spacer for centering */}
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base md:text-lg font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
              {isKnockout ? stageName : getPoolName(poolKey)}
            </p>
          </div>
        </div>
      </div>

      {/* Game Score Display */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Winner Banner */}
          {gameComplete && winner && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 sm:p-6 mb-6 shadow-2xl text-center animate-pulse">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
                🏆 {winner} Wins! 🏆
              </h2>
              <p className="text-lg sm:text-xl font-semibold">
                Final Score: {team1Score} - {team2Score}
              </p>
            </div>
          )}

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Team 1 Card */}
            <div
              className={`bg-white rounded-xl shadow-2xl p-4 sm:p-6 transition-all ${
                gameComplete && winner === team1.name
                  ? "ring-4 ring-green-500 scale-105"
                  : gameComplete && winner !== team1.name
                  ? "opacity-75"
                  : ""
              }`}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {team1.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {team1.players.join(" & ")}
                </p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-blue-600 mb-2">
                  {team1Score}
                </div>
                {team1Score >= WINNING_SCORE && team1Score > team2Score && (
                  <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                )}
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => updateScore(1, -1)}
                  disabled={gameComplete || team1Score === 0}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 text-lg sm:text-xl min-h-[50px] sm:min-h-[60px]"
                >
                  −
                </button>
                <button
                  onClick={() => updateScore(1, 1)}
                  disabled={gameComplete}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 text-lg sm:text-xl min-h-[50px] sm:min-h-[60px]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Team 2 Card */}
            <div
              className={`bg-white rounded-xl shadow-2xl p-4 sm:p-6 transition-all ${
                gameComplete && winner === team2.name
                  ? "ring-4 ring-green-500 scale-105"
                  : gameComplete && winner !== team2.name
                  ? "opacity-75"
                  : ""
              }`}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {team2.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {team2.players.join(" & ")}
                </p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-purple-600 mb-2">
                  {team2Score}
                </div>
                {team2Score >= WINNING_SCORE && team2Score > team1Score && (
                  <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                )}
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => updateScore(2, -1)}
                  disabled={gameComplete || team2Score === 0}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 text-lg sm:text-xl min-h-[50px] sm:min-h-[60px]"
                >
                  −
                </button>
                <button
                  onClick={() => updateScore(2, 1)}
                  disabled={gameComplete}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 text-lg sm:text-xl min-h-[50px] sm:min-h-[60px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">First to</p>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600">{WINNING_SCORE}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Current Score</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-800">
                  {team1Score} - {team2Score}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {gameComplete ? (
              <>
                <button
                  onClick={resetGame}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 min-h-[50px] sm:min-h-[60px] text-base sm:text-lg"
                >
                  🔄 New Game
                </button>
                <button
                  onClick={() => navigate(isKnockout ? "/knockout" : "/pools")}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 min-h-[50px] sm:min-h-[60px] text-base sm:text-lg"
                >
                  ← Back {isKnockout ? "to Knockout" : "to Pools"}
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(isKnockout ? "/knockout" : "/pools")}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 min-h-[50px] sm:min-h-[60px] text-base sm:text-lg"
              >
                ← Back {isKnockout ? "to Knockout" : "to Pools"} (Game will continue)
              </button>
            )}
          </div>

          {/* Info Notice */}
          {!gameComplete && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-xs sm:text-sm text-yellow-800">
                ⚠️ Game will be saved automatically when a team reaches {WINNING_SCORE} points
              </p>
            </div>
          )}

          {isUpdating && (
            <div className="mt-4 text-center">
              <p className="text-sm text-blue-600 font-semibold">Updating game results...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveScore;
