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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
