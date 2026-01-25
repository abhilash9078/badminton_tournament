import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Neon database
const sql = neon(process.env.DATABASE_URL);

// Get all teams
app.get('/api/teams', async (req, res) => {
  try {
    // Fetch all teams from the database in parallel for better performance
    // Since id is PRIMARY KEY, ORDER BY id is already optimized with index
    const [
      poolATeams,
      poolBTeams,
      poolCTeams,
      poolDTeams,
      poolETeams,
      poolFTeams,
      poolGTeams,
      poolHTeams
    ] = await Promise.all([
      sql`SELECT * FROM pool_a_teams ORDER BY id`,
      sql`SELECT * FROM pool_b_teams ORDER BY id`,
      sql`SELECT * FROM pool_c_teams ORDER BY id`,
      sql`SELECT * FROM pool_d_teams ORDER BY id`,
      sql`SELECT * FROM pool_e_teams ORDER BY id`,
      sql`SELECT * FROM pool_f_teams ORDER BY id`,
      sql`SELECT * FROM pool_g_teams ORDER BY id`,
      sql`SELECT * FROM pool_h_teams ORDER BY id`
    ]);
    
    // Return the data
    res.status(200).json({
      poolATeams,
      poolBTeams,
      poolCTeams,
      poolDTeams,
      poolETeams,
      poolFTeams,
      poolGTeams,
      poolHTeams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Update team
app.post('/api/teams/update', async (req, res) => {
  try {
    const { poolKey, teamIndex, team } = req.body;
    
    if (!poolKey || teamIndex === undefined || !team) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    // Determine which table to update based on poolKey
    let tableName;
    switch (poolKey) {
      case 'poolA':
        tableName = 'pool_a_teams';
        break;
      case 'poolB':
        tableName = 'pool_b_teams';
        break;
      case 'poolC':
        tableName = 'pool_c_teams';
        break;
      case 'poolD':
        tableName = 'pool_d_teams';
        break;
      case 'poolE':
        tableName = 'pool_e_teams';
        break;
      case 'poolF':
        tableName = 'pool_f_teams';
        break;
      case 'poolG':
        tableName = 'pool_g_teams';
        break;
      case 'poolH':
        tableName = 'pool_h_teams';
        break;
      default:
        return res.status(400).json({ error: 'Invalid pool key' });
    }
    
    // Update the team in the database
    // First, get the team ID from the database based on the index
    const teams = await sql`SELECT id FROM ${sql.unsafe(tableName)} ORDER BY id`;
    
    if (!teams || teamIndex >= teams.length) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    const teamId = teams[teamIndex].id;
    
    // Update the team data
    await sql`
      UPDATE ${sql.unsafe(tableName)}
      SET 
        played = ${team.played},
        won = ${team.won},
        lost = ${team.lost},
        points = ${team.points},
        qualified = ${team.qualified || false}
      WHERE id = ${teamId}
    `;
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating team:', error);
    return res.status(500).json({ error: 'Failed to update team' });
  }
});

// Live score update and game completion
app.post('/api/teams/score', async (req, res) => {
  try {
    const { poolKey, team1Index, team2Index, team1Score, team2Score, gameComplete } = req.body;
    
    if (!poolKey || team1Index === undefined || team2Index === undefined) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    // Determine which table to update based on poolKey
    let tableName;
    switch (poolKey) {
      case 'poolA':
        tableName = 'pool_a_teams';
        break;
      case 'poolB':
        tableName = 'pool_b_teams';
        break;
      case 'poolC':
        tableName = 'pool_c_teams';
        break;
      case 'poolD':
        tableName = 'pool_d_teams';
        break;
      case 'poolE':
        tableName = 'pool_e_teams';
        break;
      case 'poolF':
        tableName = 'pool_f_teams';
        break;
      case 'poolG':
        tableName = 'pool_g_teams';
        break;
      case 'poolH':
        tableName = 'pool_h_teams';
        break;
      default:
        return res.status(400).json({ error: 'Invalid pool key' });
    }
    
    // Get both teams from the database
    const teams = await sql`SELECT * FROM ${sql.unsafe(tableName)} ORDER BY id`;
    
    if (!teams || team1Index >= teams.length || team2Index >= teams.length) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    const team1Id = teams[team1Index].id;
    const team2Id = teams[team2Index].id;
    const team1 = teams[team1Index];
    const team2 = teams[team2Index];
    
    // If game is complete, update the statistics and save game result
    if (gameComplete) {
      const team1Won = team1Score > team2Score;
      const team2Won = team2Score > team1Score;
      const winnerIndex = team1Won ? team1Index : team2Index;
      const winnerName = team1Won ? team1.name : team2.name;
      
      // Save game result to game_results table (use ON CONFLICT to handle duplicates)
      await sql`
        INSERT INTO game_results (
          pool_key, team1_index, team2_index, 
          team1_name, team2_name, 
          team1_score, team2_score, 
          winner_index, winner_name
        )
        VALUES (
          ${poolKey}, ${team1Index}, ${team2Index},
          ${team1.name}, ${team2.name},
          ${team1Score}, ${team2Score},
          ${winnerIndex}, ${winnerName}
        )
        ON CONFLICT (pool_key, team1_index, team2_index) 
        DO UPDATE SET
          team1_score = ${team1Score},
          team2_score = ${team2Score},
          winner_index = ${winnerIndex},
          winner_name = ${winnerName},
          completed_at = CURRENT_TIMESTAMP
      `;
      
      // Update team 1
      const team1Played = parseInt(team1.played) || 0;
      const team1WonCount = parseInt(team1.won) || 0;
      const team1LostCount = parseInt(team1.lost) || 0;
      const team1Points = parseInt(team1.points) || 0;
      
      await sql`
        UPDATE ${sql.unsafe(tableName)}
        SET 
          played = ${team1Played + 1},
          won = ${team1Won ? team1WonCount + 1 : team1WonCount},
          lost = ${team1Won ? team1LostCount : team1LostCount + 1},
          points = ${team1Won ? team1Points + 2 : team1Points}
        WHERE id = ${team1Id}
      `;
      
      // Update team 2
      const team2Played = parseInt(team2.played) || 0;
      const team2WonCount = parseInt(team2.won) || 0;
      const team2LostCount = parseInt(team2.lost) || 0;
      const team2Points = parseInt(team2.points) || 0;
      
      await sql`
        UPDATE ${sql.unsafe(tableName)}
        SET 
          played = ${team2Played + 1},
          won = ${team2Won ? team2WonCount + 1 : team2WonCount},
          lost = ${team2Won ? team2LostCount : team2LostCount + 1},
          points = ${team2Won ? team2Points + 2 : team2Points}
        WHERE id = ${team2Id}
      `;
    }
    
    return res.status(200).json({ 
      success: true,
      team1Score,
      team2Score,
      gameComplete 
    });
  } catch (error) {
    console.error('Error updating score:', error);
    return res.status(500).json({ error: 'Failed to update score' });
  }
});

// Get completed games (optionally filtered by pool)
app.get('/api/games/completed', async (req, res) => {
  try {
    const { poolKey } = req.query;
    
    let completedGames;
    
    if (poolKey) {
      // Fetch all completed games for this pool
      completedGames = await sql`
        SELECT 
          pool_key,
          team1_index,
          team2_index,
          team1_name,
          team2_name,
          team1_score,
          team2_score,
          winner_name,
          completed_at
        FROM game_results
        WHERE pool_key = ${poolKey}
        ORDER BY completed_at DESC
      `;
    } else {
      // Fetch all completed games
      completedGames = await sql`
        SELECT 
          pool_key,
          team1_index,
          team2_index,
          team1_name,
          team2_name,
          team1_score,
          team2_score,
          winner_name,
          completed_at
        FROM game_results
        ORDER BY completed_at DESC
      `;
    }
    
    return res.status(200).json({ completedGames });
  } catch (error) {
    console.error('Error fetching completed games:', error);
    res.status(500).json({ error: 'Failed to fetch completed games' });
  }
});

// ================================================================
// Knockout Stages API Endpoints
// ================================================================

// Get all knockout matches
app.get('/api/knockout/matches', async (req, res) => {
  try {
    const { stage } = req.query;
    
    let matches;
    if (stage) {
      matches = await sql`
        SELECT * FROM knockout_matches
        WHERE stage = ${stage}
        ORDER BY match_number ASC
      `;
    } else {
      matches = await sql`
        SELECT * FROM knockout_matches
        ORDER BY 
          CASE stage
            WHEN 'round_of_16' THEN 1
            WHEN 'quarter' THEN 2
            WHEN 'semi' THEN 3
            WHEN 'final' THEN 4
          END,
          match_number ASC
      `;
    }
    
    return res.status(200).json({ matches });
  } catch (error) {
    console.error('Error fetching knockout matches:', error);
    res.status(500).json({ error: 'Failed to fetch knockout matches' });
  }
});

// Get completed knockout games
app.get('/api/knockout/completed', async (req, res) => {
  try {
    const { stage } = req.query;
    
    let completedGames;
    if (stage) {
      completedGames = await sql`
        SELECT * FROM knockout_game_results
        WHERE stage = ${stage}
        ORDER BY match_number ASC
      `;
    } else {
      completedGames = await sql`
        SELECT * FROM knockout_game_results
        ORDER BY 
          CASE stage
            WHEN 'round_of_16' THEN 1
            WHEN 'quarter' THEN 2
            WHEN 'semi' THEN 3
            WHEN 'final' THEN 4
          END,
          match_number ASC
      `;
    }
    
    return res.status(200).json({ completedGames });
  } catch (error) {
    console.error('Error fetching completed knockout games:', error);
    res.status(500).json({ error: 'Failed to fetch completed knockout games' });
  }
});

// Update knockout match (for setting teams, editing scores, etc.)
app.post('/api/knockout/update', async (req, res) => {
  try {
    const { stage, matchNumber, team1Name, team1Players, team2Name, team2Players, team1Score, team2Score, isCompleted } = req.body;
    
    if (!stage || !matchNumber) {
      return res.status(400).json({ error: 'Missing required data: stage and matchNumber' });
    }
    
    // Check if match exists
    const existingMatch = await sql`
      SELECT * FROM knockout_matches
      WHERE stage = ${stage} AND match_number = ${matchNumber}
    `;
    
    if (existingMatch.length === 0) {
      // Create new match
      await sql`
        INSERT INTO knockout_matches (
          stage, match_number, 
          team1_name, team1_players,
          team2_name, team2_players,
          team1_score, team2_score,
          is_completed, updated_at
        )
        VALUES (
          ${stage}, ${matchNumber},
          ${team1Name || null}, ${team1Players ? sql.array(team1Players) : null},
          ${team2Name || null}, ${team2Players ? sql.array(team2Players) : null},
          ${team1Score || 0}, ${team2Score || 0},
          ${isCompleted || false}, CURRENT_TIMESTAMP
        )
      `;
    } else {
      // Update existing match
      const winnerName = isCompleted && team1Score > team2Score ? team1Name : 
                        isCompleted && team2Score > team1Score ? team2Name : null;
      
      // Update existing match - use COALESCE to only update provided fields
      await sql`
        UPDATE knockout_matches
        SET 
          team1_name = COALESCE(${team1Name}, team1_name),
          team1_players = COALESCE(${team1Players}, team1_players),
          team2_name = COALESCE(${team2Name}, team2_name),
          team2_players = COALESCE(${team2Players}, team2_players),
          team1_score = COALESCE(${team1Score}, team1_score),
          team2_score = COALESCE(${team2Score}, team2_score),
          winner_name = COALESCE(${winnerName}, winner_name),
          is_completed = COALESCE(${isCompleted}, is_completed),
          completed_at = CASE WHEN ${isCompleted} THEN CURRENT_TIMESTAMP ELSE completed_at END,
          updated_at = CURRENT_TIMESTAMP
        WHERE stage = ${stage} AND match_number = ${matchNumber}
      `;
      
      // If completed, save to knockout_game_results
      if (isCompleted && winnerName) {
        await sql`
          INSERT INTO knockout_game_results (
            stage, match_number,
            team1_name, team2_name,
            team1_score, team2_score,
            winner_name
          )
          VALUES (
            ${stage}, ${matchNumber},
            ${team1Name}, ${team2Name},
            ${team1Score}, ${team2Score},
            ${winnerName}
          )
          ON CONFLICT (stage, match_number)
          DO UPDATE SET
            team1_name = ${team1Name},
            team2_name = ${team2Name},
            team1_score = ${team1Score},
            team2_score = ${team2Score},
            winner_name = ${winnerName},
            completed_at = CURRENT_TIMESTAMP
        `;
      }
    }
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating knockout match:', error);
    return res.status(500).json({ error: 'Failed to update knockout match' });
  }
});

// Update knockout score (for live scoring)
app.post('/api/knockout/score', async (req, res) => {
  try {
    const { stage, matchNumber, team1Score, team2Score, gameComplete } = req.body;
    
    if (!stage || !matchNumber) {
      return res.status(400).json({ error: 'Missing required data: stage and matchNumber' });
    }
    
    // Get the match
    const matches = await sql`
      SELECT * FROM knockout_matches
      WHERE stage = ${stage} AND match_number = ${matchNumber}
    `;
    
    if (matches.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    const match = matches[0];
    
    // Update scores
    await sql`
      UPDATE knockout_matches
      SET 
        team1_score = ${team1Score || 0},
        team2_score = ${team2Score || 0},
        updated_at = CURRENT_TIMESTAMP
      WHERE stage = ${stage} AND match_number = ${matchNumber}
    `;
    
    // If game is complete, update winner and save to results
    if (gameComplete) {
      const winnerName = team1Score > team2Score ? match.team1_name : match.team2_name;
      
      await sql`
        UPDATE knockout_matches
        SET 
          winner_name = ${winnerName},
          is_completed = true,
          completed_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE stage = ${stage} AND match_number = ${matchNumber}
      `;
      
      // Save to knockout_game_results
      await sql`
        INSERT INTO knockout_game_results (
          stage, match_number,
          team1_name, team2_name,
          team1_score, team2_score,
          winner_name
        )
        VALUES (
          ${stage}, ${matchNumber},
          ${match.team1_name}, ${match.team2_name},
          ${team1Score}, ${team2Score},
          ${winnerName}
        )
        ON CONFLICT (stage, match_number)
        DO UPDATE SET
          team1_name = ${match.team1_name},
          team2_name = ${match.team2_name},
          team1_score = ${team1Score},
          team2_score = ${team2Score},
          winner_name = ${winnerName},
          completed_at = CURRENT_TIMESTAMP
      `;
    }
    
    return res.status(200).json({ 
      success: true,
      team1Score,
      team2Score,
      gameComplete 
    });
  } catch (error) {
    console.error('Error updating knockout score:', error);
    return res.status(500).json({ error: 'Failed to update knockout score' });
  }
});

// Initialize knockout stages (create all matches)
app.post('/api/knockout/initialize', async (req, res) => {
  try {
    // Round of 16: 8 matches
    for (let i = 1; i <= 8; i++) {
      await sql`
        INSERT INTO knockout_matches (stage, match_number)
        VALUES ('round_of_16', ${i})
        ON CONFLICT (stage, match_number) DO NOTHING
      `;
    }
    
    // Quarter-finals: 4 matches
    for (let i = 1; i <= 4; i++) {
      await sql`
        INSERT INTO knockout_matches (stage, match_number)
        VALUES ('quarter', ${i})
        ON CONFLICT (stage, match_number) DO NOTHING
      `;
    }
    
    // Semi-finals: 2 matches
    for (let i = 1; i <= 2; i++) {
      await sql`
        INSERT INTO knockout_matches (stage, match_number)
        VALUES ('semi', ${i})
        ON CONFLICT (stage, match_number) DO NOTHING
      `;
    }
    
    // Final: 1 match
    await sql`
      INSERT INTO knockout_matches (stage, match_number)
      VALUES ('final', 1)
      ON CONFLICT (stage, match_number) DO NOTHING
    `;
    
    return res.status(200).json({ success: true, message: 'Knockout stages initialized' });
  } catch (error) {
    console.error('Error initializing knockout stages:', error);
    return res.status(500).json({ error: 'Failed to initialize knockout stages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});