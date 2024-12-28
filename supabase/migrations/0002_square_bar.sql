/*
  # Fix RLS Policies

  1. Changes
    - Remove recursive admin policies that were causing infinite recursion
    - Simplify RLS policies for profiles and applications tables
    - Add direct role check for admin access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Students can view own applications" ON applications;
DROP POLICY IF EXISTS "Students can insert own applications" ON applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can update applications" ON applications;

-- Create new simplified policies for profiles
CREATE POLICY "Enable read access for users to own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable read access for admin users"
  ON profiles FOR SELECT
  TO authenticated
  USING (role = 'admin');

-- Create new simplified policies for applications
CREATE POLICY "Enable read access for users to own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Enable insert access for users to own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Enable read/update access for admin users"
  ON applications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );