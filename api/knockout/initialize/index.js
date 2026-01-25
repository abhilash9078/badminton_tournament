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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
