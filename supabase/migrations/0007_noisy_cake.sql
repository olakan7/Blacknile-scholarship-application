/*
  # Add address column to applications table

  1. Changes
    - Add JSONB address column to applications table to store structured address data
      - street
      - city
      - state
      - zipCode
      - country

  2. Notes
    - Using JSONB for flexible address storage
    - Maintains backward compatibility
*/

ALTER TABLE applications
ADD COLUMN IF NOT EXISTS address jsonb DEFAULT '{}'::jsonb;