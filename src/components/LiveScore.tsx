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
const MAX_SCORE = 30;
const DEUCE_THRESHOLD = 20;

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
  const isFinal = stage === "final";
  const isSemiFinal = stage === "semi";
  const requiresDeuce = isSemiFinal || isFinal;
  
  const [team1, setTeam1] = useState<TeamData | null>(null);
  const [team2, setTeam2] = useState<TeamData | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stageName, setStageName] = useState("");
  
  // Set-based scoring for finals
  const [currentSet, setCurrentSet] = useState(1);
  const [team1SetsWon, setTeam1SetsWon] = useState(0);
  const [team2SetsWon, setTeam2SetsWon] = useState(0);
  const [setScores, setSetScores] = useState<{set: number, team1: number, team2: number}[]>([]);

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
        if (isFinal) {
          setCurrentSet(gameData.currentSet || 1);
          setTeam1SetsWon(gameData.team1SetsWon || 0);
          setTeam2SetsWon(gameData.team2SetsWon || 0);
          setSetScores(gameData.setScores || []);
        }
      } catch (error) {
        console.error("Error loading saved game:", error);
      }
    }
  }, [gameKey, isFinal]);

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

  // Check for set/game winner
  useEffect(() => {
    if (gameComplete) return;
    
    const checkSetWinner = () => {
      let setWinner: string | null = null;
      
      // Check if someone reached max score (30)
      if (team1Score >= MAX_SCORE) {
        setWinner = team1?.name || "Team 1";
      } else if (team2Score >= MAX_SCORE) {
        setWinner = team2?.name || "Team 2";
      }
      // Check normal winning conditions
      else if (requiresDeuce) {
        // Deuce rules: need 2 point lead after 20-20, or first to 30
        if (team1Score >= WINNING_SCORE && team1Score > team2Score) {
          if (team1Score < DEUCE_THRESHOLD || team2Score < DEUCE_THRESHOLD || team1Score - team2Score >= 2) {
            setWinner = team1?.name || "Team 1";
          }
        } else if (team2Score >= WINNING_SCORE && team2Score > team1Score) {
          if (team2Score < DEUCE_THRESHOLD || team1Score < DEUCE_THRESHOLD || team2Score - team1Score >= 2) {
            setWinner = team2?.name || "Team 2";
          }
        }
      } else {
        // Normal rules: first to 21
    if (team1Score >= WINNING_SCORE && team1Score > team2Score) {
          setWinner = team1?.name || "Team 1";
        } else if (team2Score >= WINNING_SCORE && team2Score > team1Score) {
          setWinner = team2?.name || "Team 2";
        }
      }
      
      if (setWinner) {
        handleSetComplete(setWinner);
      }
    };
    
    checkSetWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team1Score, team2Score, team1, team2, gameKey, requiresDeuce]);
  
  // Handle set completion
  const handleSetComplete = (setWinnerName: string) => {
    if (isFinal) {
      // Update sets won
      const newTeam1Sets = setWinnerName === team1?.name ? team1SetsWon + 1 : team1SetsWon;
      const newTeam2Sets = setWinnerName === team2?.name ? team2SetsWon + 1 : team2SetsWon;
      
      // Save set score
      const newSetScores = [...setScores, { set: currentSet, team1: team1Score, team2: team2Score }];
      setSetScores(newSetScores);
      
      // Check if match is complete (best of 3 - first to win 2 sets)
      if (newTeam1Sets === 2 || newTeam2Sets === 2) {
        // Match is complete - someone won 2 sets
        const matchWinner = newTeam1Sets === 2 ? team1?.name || "Team 1" : team2?.name || "Team 2";
        setGameComplete(true);
        setWinner(matchWinner);
        setTeam1SetsWon(newTeam1Sets);
        setTeam2SetsWon(newTeam2Sets);
        localStorage.setItem(gameKey, JSON.stringify({
          team1Score,
          team2Score,
          gameComplete: true,
          winner: matchWinner,
          currentSet,
          team1SetsWon: newTeam1Sets,
          team2SetsWon: newTeam2Sets,
          setScores: newSetScores
        }));
        handleGameComplete();
      } else if (currentSet >= 3) {
        // Safety check: If we somehow reach set 4, end the match
        // (This shouldn't happen, but just in case)
        const matchWinner = newTeam1Sets > newTeam2Sets ? team1?.name || "Team 1" : team2?.name || "Team 2";
      setGameComplete(true);
        setWinner(matchWinner);
        setTeam1SetsWon(newTeam1Sets);
        setTeam2SetsWon(newTeam2Sets);
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score,
        team2Score,
        gameComplete: true,
          winner: matchWinner,
          currentSet: 3,
          team1SetsWon: newTeam1Sets,
          team2SetsWon: newTeam2Sets,
          setScores: newSetScores
      }));
      handleGameComplete();
      } else {
        // Move to next set (Set 2 or Set 3)
        setTeam1SetsWon(newTeam1Sets);
        setTeam2SetsWon(newTeam2Sets);
        const nextSet = currentSet + 1;
        setCurrentSet(nextSet);
        setTeam1Score(0);
        setTeam2Score(0);
        localStorage.setItem(gameKey, JSON.stringify({
          team1Score: 0,
          team2Score: 0,
          gameComplete: false,
          winner: null,
          currentSet: nextSet,
          team1SetsWon: newTeam1Sets,
          team2SetsWon: newTeam2Sets,
          setScores: newSetScores
        }));
      }
    } else {
      // Non-final: single set, game over
      setGameComplete(true);
      setWinner(setWinnerName);
      localStorage.setItem(gameKey, JSON.stringify({
        team1Score,
        team2Score,
        gameComplete: true,
        winner: setWinnerName
      }));
      handleGameComplete();
    }
  };

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
      const saveData: any = {
        team1Score: newScore,
        team2Score,
        gameComplete: false,
        winner: null
      };
      if (isFinal) {
        saveData.currentSet = currentSet;
        saveData.team1SetsWon = team1SetsWon;
        saveData.team2SetsWon = team2SetsWon;
        saveData.setScores = setScores;
      }
      localStorage.setItem(gameKey, JSON.stringify(saveData));
      
      // Update knockout match score in real-time (only for non-finals or final total)
      if (isKnockout && !isFinal) {
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
      const saveData: any = {
        team1Score,
        team2Score: newScore,
        gameComplete: false,
        winner: null
      };
      if (isFinal) {
        saveData.currentSet = currentSet;
        saveData.team1SetsWon = team1SetsWon;
        saveData.team2SetsWon = team2SetsWon;
        saveData.setScores = setScores;
      }
      localStorage.setItem(gameKey, JSON.stringify(saveData));
      
      // Update knockout match score in real-time (only for non-finals or final total)
      if (isKnockout && !isFinal) {
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
              {isFinal ? (
                <div>
                  <p className="text-lg sm:text-xl font-semibold mb-3">
                    Final Sets: {team1SetsWon} - {team2SetsWon}
                  </p>
                  <div className="space-y-1">
                    {[1, 2, 3].map((setNum) => {
                      const setScore = setScores.find(s => s.set === setNum);
                      return (
                        <p key={setNum} className="text-sm sm:text-base font-semibold">
                          Set {setNum}: {setScore ? `${setScore.team1} - ${setScore.team2}` : '-'}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : (
              <p className="text-lg sm:text-xl font-semibold">
                Final Score: {team1Score} - {team2Score}
              </p>
              )}
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
                {/* Only show Winner if they actually meet winning conditions including deuce rules */}
                {team1Score >= WINNING_SCORE && team1Score > team2Score && (
                  requiresDeuce ? (
                    // Deuce rules: must have 2-point lead after 20-20, or reached max score
                    (team1Score >= MAX_SCORE || team1Score < DEUCE_THRESHOLD || team2Score < DEUCE_THRESHOLD || team1Score - team2Score >= 2) && (
                      <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                    )
                  ) : (
                  <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                  )
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
                {/* Only show Winner if they actually meet winning conditions including deuce rules */}
                {team2Score >= WINNING_SCORE && team2Score > team1Score && (
                  requiresDeuce ? (
                    // Deuce rules: must have 2-point lead after 20-20, or reached max score
                    (team2Score >= MAX_SCORE || team2Score < DEUCE_THRESHOLD || team1Score < DEUCE_THRESHOLD || team2Score - team1Score >= 2) && (
                      <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                    )
                  ) : (
                  <p className="text-green-600 font-bold text-sm sm:text-base">Winner!</p>
                  )
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
            {isFinal && !gameComplete && (
              <div className="text-center mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Sets Won</p>
                <div className="flex justify-center gap-8">
                  <div>
                    <p className="text-xs text-gray-500">{team1?.name}</p>
                    <p className="text-3xl font-black text-blue-600">{team1SetsWon}</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">-</div>
                  <div>
                    <p className="text-xs text-gray-500">{team2?.name}</p>
                    <p className="text-3xl font-black text-purple-600">{team2SetsWon}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-indigo-600 mt-2">Set {currentSet} of 3</p>
                
                {/* Display all set scores */}
                {setScores.length > 0 && (
                  <div className="mt-4 space-y-1">
                    <p className="text-xs text-gray-500 mb-2">Previous Sets:</p>
                    {setScores.map((score, idx) => (
                      <p key={idx} className="text-sm font-semibold text-gray-700">
                        Set {score.set}: <span className="text-blue-600">{score.team1}</span> - <span className="text-purple-600">{score.team2}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className={`grid ${isFinal ? 'grid-cols-3' : 'grid-cols-2'} gap-4 text-center`}>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  {requiresDeuce ? "Win at" : "First to"}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600">{WINNING_SCORE}</p>
                {requiresDeuce && (
                  <p className="text-xs text-gray-500 mt-1">
                    +2 lead or {MAX_SCORE}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Current Score</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-800">
                  {team1Score} - {team2Score}
                </p>
                {requiresDeuce && team1Score >= DEUCE_THRESHOLD && team2Score >= DEUCE_THRESHOLD && (
                  <p className="text-xs text-orange-600 font-bold mt-1">
                    {Math.abs(team1Score - team2Score) < 2 ? "DEUCE!" : ""}
                  </p>
                )}
              </div>
              {isFinal && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Best of</p>
                  <p className="text-2xl sm:text-3xl font-black text-green-600">3</p>
                  <p className="text-xs text-gray-500 mt-1">sets</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
              onClick={() => navigate(isKnockout ? "/knockout" : "/pools")}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 rounded-lg transition-all active:scale-95 min-h-[50px] sm:min-h-[60px] text-base sm:text-lg"
              >
              ← Back {isKnockout ? "to Knockout" : "to Pools"}
              </button>
          </div>

          {/* Info Notice */}
          {!gameComplete && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-xs sm:text-sm text-yellow-800">
                {isFinal 
                  ? `⚠️ Best of 3 sets - First team to win 2 sets wins the match!`
                  : requiresDeuce
                  ? `⚠️ Win at ${WINNING_SCORE} points (with 2-point lead after ${DEUCE_THRESHOLD}-${DEUCE_THRESHOLD}) or first to ${MAX_SCORE}`
                  : `⚠️ Game will be saved automatically when a team reaches ${WINNING_SCORE} points`
                }
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
