/*
  # Add missing columns for application documents

  1. Changes
    - Add date_of_birth column
    - Add current_school column
    - Add student_id_url column
    - Add national_id_url column
    - Add document_urls column if not exists
    - Add documents_metadata column if not exists

  2. Security
    - No changes to RLS policies needed
*/

ALTER TABLE applications
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS current_school text,
ADD COLUMN IF NOT EXISTS student_id_url text,
ADD COLUMN IF NOT EXISTS national_id_url text,
ADD COLUMN IF NOT EXISTS document_urls jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS documents_metadata jsonb DEFAULT '{}'::jsonb;