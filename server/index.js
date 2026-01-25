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
    
    // If game is complete, update the statistics
    if (gameComplete) {
      const team1Won = team1Score > team2Score;
      const team2Won = team2Score > team1Score;
      
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});