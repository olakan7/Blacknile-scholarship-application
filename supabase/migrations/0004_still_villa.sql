/*
  # Add document URLs to applications table

  1. Changes
    - Add JSON column for storing document URLs
    - Add column for storing additional documents metadata
*/

ALTER TABLE applications
ADD COLUMN IF NOT EXISTS document_urls jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS documents_metadata jsonb DEFAULT '{}'::jsonb;