/*
  # Add storage policies for file uploads

  1. Changes
    - Create storage buckets if they don't exist
    - Add policies for student-ids bucket
    - Add policies for national-ids bucket
    - Add policies for documents bucket

  2. Security
    - Students can upload their own documents
    - Admins can read all documents
    - Files are publicly accessible (needed for URLs)
*/

-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('student-ids', 'student-ids', true),
  ('national-ids', 'national-ids', true),
  ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for student-ids bucket
CREATE POLICY "Students can upload their own student ID"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'student-ids' AND
    (auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role = 'student'
    ))
  );

CREATE POLICY "Anyone can read student IDs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'student-ids');

-- Policies for national-ids bucket
CREATE POLICY "Students can upload their own national ID"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'national-ids' AND
    (auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role = 'student'
    ))
  );

CREATE POLICY "Anyone can read national IDs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'national-ids');

-- Policies for documents bucket
CREATE POLICY "Students can upload their documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'documents' AND
    (auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role = 'student'
    ))
  );

CREATE POLICY "Anyone can read documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents');