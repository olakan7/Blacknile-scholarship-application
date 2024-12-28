/*
  # Fix Application Policies

  1. Changes
    - Update application policies to properly handle student submissions
    - Ensure students can only submit applications for themselves
    - Maintain admin access for all operations
*/

-- Drop existing application policies
DROP POLICY IF EXISTS "Enable read access for users to own applications" ON applications;
DROP POLICY IF EXISTS "Enable insert access for users to own applications" ON applications;
DROP POLICY IF EXISTS "Enable read/update access for admin users" ON applications;

-- Create new application policies
CREATE POLICY "Students can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Students can submit applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins can update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );