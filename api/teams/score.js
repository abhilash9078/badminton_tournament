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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
