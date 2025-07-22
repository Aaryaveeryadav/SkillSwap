/*
  # Create users table and authentication

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `avatar_url` (text)
      - `location` (text)
      - `bio` (text)
      - `rating` (numeric)
      - `review_count` (integer)
      - `completed_exchanges` (integer)
      - `verified` (boolean)
      - `is_online` (boolean)
      - `last_seen` (timestamptz)
      - `verification_status` (text)
      - `learning_mode` (text)
      - `subscription` (text)
      - `phone` (text)
      - `address` (text)
      - `id_verified` (boolean)
      - `availability` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to read/write their own data
    - Add policy for public read access to profiles
</sql>

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  location text,
  bio text,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  completed_exchanges integer DEFAULT 0,
  verified boolean DEFAULT false,
  is_online boolean DEFAULT false,
  last_seen timestamptz DEFAULT now(),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  learning_mode text DEFAULT 'both' CHECK (learning_mode IN ('online', 'offline', 'both')),
  subscription text DEFAULT 'free' CHECK (subscription IN ('free', 'premium')),
  phone text,
  address text,
  id_verified boolean DEFAULT false,
  availability text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name, email, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();