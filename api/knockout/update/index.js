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
            ${team1Name || null}, ${team1Players || null},
            ${team2Name || null}, ${team2Players || null},
            ${team1Score || 0}, ${team2Score || 0},
            ${isCompleted || false}, CURRENT_TIMESTAMP
          )
        `;
      } else {
        // Update existing match
        const winnerName = isCompleted && team1Score !== undefined && team2Score !== undefined && team1Score > team2Score ? team1Name : 
                          isCompleted && team1Score !== undefined && team2Score !== undefined && team2Score > team1Score ? team2Name : 
                          existingMatch[0]?.winner_name;
        
        // Update existing match - update all fields that are provided
        // Use the existing values from the match if not provided
        const currentMatch = existingMatch[0];
        const finalTeam1Name = team1Name !== undefined ? (team1Name || null) : currentMatch.team1_name;
        const finalTeam1Players = team1Players !== undefined ? (team1Players || null) : currentMatch.team1_players;
        const finalTeam2Name = team2Name !== undefined ? (team2Name || null) : currentMatch.team2_name;
        const finalTeam2Players = team2Players !== undefined ? (team2Players || null) : currentMatch.team2_players;
        const finalTeam1Score = team1Score !== undefined ? (team1Score || 0) : (currentMatch.team1_score || 0);
        const finalTeam2Score = team2Score !== undefined ? (team2Score || 0) : (currentMatch.team2_score || 0);
        const finalIsCompleted = isCompleted !== undefined ? isCompleted : (currentMatch.is_completed || false);
        
        // Determine winner if completed
        const finalWinnerName = finalIsCompleted && finalTeam1Score > finalTeam2Score ? finalTeam1Name :
                               finalIsCompleted && finalTeam2Score > finalTeam1Score ? finalTeam2Name :
                               winnerName || currentMatch.winner_name;
        
        await sql`
          UPDATE knockout_matches
          SET 
            team1_name = ${finalTeam1Name},
            team1_players = ${finalTeam1Players},
            team2_name = ${finalTeam2Name},
            team2_players = ${finalTeam2Players},
            team1_score = ${finalTeam1Score},
            team2_score = ${finalTeam2Score},
            winner_name = ${finalWinnerName},
            is_completed = ${finalIsCompleted},
            completed_at = ${finalIsCompleted ? sql`CURRENT_TIMESTAMP` : sql`completed_at`},
            updated_at = CURRENT_TIMESTAMP
          WHERE stage = ${stage} AND match_number = ${matchNumber}
        `;
        
        // If completed, save to knockout_game_results
        if (isCompleted && winnerName && team1Name && team2Name) {
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
              ${team1Score || 0}, ${team2Score || 0},
              ${winnerName}
            )
            ON CONFLICT (stage, match_number)
            DO UPDATE SET
              team1_name = ${team1Name},
              team2_name = ${team2Name},
              team1_score = ${team1Score || 0},
              team2_score = ${team2Score || 0},
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
