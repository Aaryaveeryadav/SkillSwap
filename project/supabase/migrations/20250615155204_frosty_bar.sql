/*
  # Create skills table

  1. New Tables
    - `skills`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `category` (text)
      - `level` (text)
      - `description` (text)
      - `years_of_experience` (integer)
      - `skill_type` (text) - 'offered' or 'wanted'
      - `has_certification` (boolean)
      - `certification_name` (text)
      - `certification_issuer` (text)
      - `certification_date` (date)
      - `portfolio_url` (text)
      - `additional_experience` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `skills` table
    - Add policies for authenticated users to manage their own skills
    - Add policy for public read access to skills
</sql>

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  description text,
  years_of_experience integer DEFAULT 0,
  skill_type text NOT NULL CHECK (skill_type IN ('offered', 'wanted')),
  has_certification boolean DEFAULT false,
  certification_name text,
  certification_issuer text,
  certification_date date,
  portfolio_url text,
  additional_experience text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Everyone can read skills
CREATE POLICY "Skills are viewable by everyone"
  ON skills
  FOR SELECT
  USING (true);

-- Users can manage their own skills
CREATE POLICY "Users can manage own skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();