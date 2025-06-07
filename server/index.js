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
    // Fetch all teams from the database
    const poolATeams = await sql`SELECT * FROM pool_a_teams ORDER BY id`;
    const poolBTeams = await sql`SELECT * FROM pool_b_teams ORDER BY id`;
    const poolCTeams = await sql`SELECT * FROM pool_c_teams ORDER BY id`;
    const poolDTeams = await sql`SELECT * FROM pool_d_teams ORDER BY id`;
    
    // Return the data
    res.status(200).json({
      poolATeams,
      poolBTeams,
      poolCTeams,
      poolDTeams
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
        points = ${team.points}
      WHERE id = ${teamId}
    `;
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating team:', error);
    return res.status(500).json({ error: 'Failed to update team' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});