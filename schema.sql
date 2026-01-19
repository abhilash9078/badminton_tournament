-- ================================================================
-- Shuttle Showdown 4.0 - Complete Database Setup
-- Fresh Start: Creates all 8 pools with 3 teams each
-- Total: 24 teams, 48 players
-- ================================================================

-- ================================================================
-- Drop existing tables (CAREFUL - This deletes all data!)
-- ================================================================
DROP TABLE IF EXISTS pool_a_teams CASCADE;
DROP TABLE IF EXISTS pool_b_teams CASCADE;
DROP TABLE IF EXISTS pool_c_teams CASCADE;
DROP TABLE IF EXISTS pool_d_teams CASCADE;
DROP TABLE IF EXISTS pool_e_teams CASCADE;
DROP TABLE IF EXISTS pool_f_teams CASCADE;
DROP TABLE IF EXISTS pool_g_teams CASCADE;
DROP TABLE IF EXISTS pool_h_teams CASCADE;

-- ================================================================
-- Create All Pool Tables
-- ================================================================

CREATE TABLE pool_a_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_b_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_c_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_d_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_e_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_f_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_g_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

CREATE TABLE pool_h_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    players TEXT[] NOT NULL,
    played VARCHAR(10) DEFAULT '-',
    won VARCHAR(10) DEFAULT '-',
    lost VARCHAR(10) DEFAULT '-',
    points VARCHAR(10) DEFAULT '-',
    qualified BOOLEAN DEFAULT false
);

-- ================================================================
-- Insert Dummy Data - Pool A (Teams 1-3, Players 1-6)
-- ================================================================
INSERT INTO pool_a_teams (name, players, played, won, lost, points, qualified) VALUES
('Team A1', ARRAY['Player 1', 'Player 2'], '-', '-', '-', '-', false),
('Team A2', ARRAY['Player 3', 'Player 4'], '-', '-', '-', '-', false),
('Team A3', ARRAY['Player 5', 'Player 6'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool B (Teams 4-6, Players 7-12)
-- ================================================================
INSERT INTO pool_b_teams (name, players, played, won, lost, points, qualified) VALUES
('Team B1', ARRAY['Player 7', 'Player 8'], '-', '-', '-', '-', false),
('Team B2', ARRAY['Player 9', 'Player 10'], '-', '-', '-', '-', false),
('Team B3', ARRAY['Player 11', 'Player 12'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool C (Teams 7-9, Players 13-18)
-- ================================================================
INSERT INTO pool_c_teams (name, players, played, won, lost, points, qualified) VALUES
('Team C1', ARRAY['Player 13', 'Player 14'], '-', '-', '-', '-', false),
('Team C2', ARRAY['Player 15', 'Player 16'], '-', '-', '-', '-', false),
('Team C3', ARRAY['Player 17', 'Player 18'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool D (Teams 10-12, Players 19-24)
-- ================================================================
INSERT INTO pool_d_teams (name, players, played, won, lost, points, qualified) VALUES
('Team D1', ARRAY['Player 19', 'Player 20'], '-', '-', '-', '-', false),
('Team D2', ARRAY['Player 21', 'Player 22'], '-', '-', '-', '-', false),
('Team D3', ARRAY['Player 23', 'Player 24'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool E (Teams 13-15, Players 25-30)
-- ================================================================
INSERT INTO pool_e_teams (name, players, played, won, lost, points, qualified) VALUES
('Team E1', ARRAY['Player 25', 'Player 26'], '-', '-', '-', '-', false),
('Team E2', ARRAY['Player 27', 'Player 28'], '-', '-', '-', '-', false),
('Team E3', ARRAY['Player 29', 'Player 30'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool F (Teams 16-18, Players 31-36)
-- ================================================================
INSERT INTO pool_f_teams (name, players, played, won, lost, points, qualified) VALUES
('Team F1', ARRAY['Player 31', 'Player 32'], '-', '-', '-', '-', false),
('Team F2', ARRAY['Player 33', 'Player 34'], '-', '-', '-', '-', false),
('Team F3', ARRAY['Player 35', 'Player 36'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool G (Teams 19-21, Players 37-42)
-- ================================================================
INSERT INTO pool_g_teams (name, players, played, won, lost, points, qualified) VALUES
('Team G1', ARRAY['Player 37', 'Player 38'], '-', '-', '-', '-', false),
('Team G2', ARRAY['Player 39', 'Player 40'], '-', '-', '-', '-', false),
('Team G3', ARRAY['Player 41', 'Player 42'], '-', '-', '-', '-', false);

-- ================================================================
-- Insert Dummy Data - Pool H (Teams 22-24, Players 43-48)
-- ================================================================
INSERT INTO pool_h_teams (name, players, played, won, lost, points, qualified) VALUES
('Team H1', ARRAY['Player 43', 'Player 44'], '-', '-', '-', '-', false),
('Team H2', ARRAY['Player 45', 'Player 46'], '-', '-', '-', '-', false),
('Team H3', ARRAY['Player 47', 'Player 48'], '-', '-', '-', '-', false);

-- ================================================================
-- Verify Setup - Check all pools have 3 teams
-- ================================================================
SELECT 
    'Pool A' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_a_teams
UNION ALL
SELECT 
    'Pool B' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_b_teams
UNION ALL
SELECT 
    'Pool C' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_c_teams
UNION ALL
SELECT 
    'Pool D' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_d_teams
UNION ALL
SELECT 
    'Pool E' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_e_teams
UNION ALL
SELECT 
    'Pool F' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_f_teams
UNION ALL
SELECT 
    'Pool G' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_g_teams
UNION ALL
SELECT 
    'Pool H' as pool, 
    COUNT(*) as team_count,
    ARRAY_AGG(name ORDER BY id) as teams
FROM pool_h_teams;

-- ================================================================
-- Summary Query - Total teams and players
-- ================================================================
SELECT 
    'TOTAL' as summary,
    (SELECT COUNT(*) FROM pool_a_teams) +
    (SELECT COUNT(*) FROM pool_b_teams) +
    (SELECT COUNT(*) FROM pool_c_teams) +
    (SELECT COUNT(*) FROM pool_d_teams) +
    (SELECT COUNT(*) FROM pool_e_teams) +
    (SELECT COUNT(*) FROM pool_f_teams) +
    (SELECT COUNT(*) FROM pool_g_teams) +
    (SELECT COUNT(*) FROM pool_h_teams) as total_teams,
    ((SELECT COUNT(*) FROM pool_a_teams) +
    (SELECT COUNT(*) FROM pool_b_teams) +
    (SELECT COUNT(*) FROM pool_c_teams) +
    (SELECT COUNT(*) FROM pool_d_teams) +
    (SELECT COUNT(*) FROM pool_e_teams) +
    (SELECT COUNT(*) FROM pool_f_teams) +
    (SELECT COUNT(*) FROM pool_g_teams) +
    (SELECT COUNT(*) FROM pool_h_teams)) * 2 as total_players;
