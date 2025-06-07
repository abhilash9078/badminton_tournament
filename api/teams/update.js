import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Neon database
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}