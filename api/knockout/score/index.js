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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
