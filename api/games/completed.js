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
  
  if (req.method === 'GET') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
