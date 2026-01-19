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
      // Fetch all teams from the database (8 pools now)
      const poolATeams = await sql`SELECT * FROM pool_a_teams ORDER BY id`;
      const poolBTeams = await sql`SELECT * FROM pool_b_teams ORDER BY id`;
      const poolCTeams = await sql`SELECT * FROM pool_c_teams ORDER BY id`;
      const poolDTeams = await sql`SELECT * FROM pool_d_teams ORDER BY id`;
      const poolETeams = await sql`SELECT * FROM pool_e_teams ORDER BY id`;
      const poolFTeams = await sql`SELECT * FROM pool_f_teams ORDER BY id`;
      const poolGTeams = await sql`SELECT * FROM pool_g_teams ORDER BY id`;
      const poolHTeams = await sql`SELECT * FROM pool_h_teams ORDER BY id`;
      
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}