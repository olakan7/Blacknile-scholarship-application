/*
  # Add Application Status Tracking

  1. Changes
    - Add status_stage column to track detailed application progress
    - Add contact_date column to track when the student was contacted
    - Add status_updated_at column to track when the status was last updated
    - Add notes column for internal comments
*/

-- Add new columns for status tracking
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS status_stage text DEFAULT 'submitted' CHECK (
  status_stage IN (
    'submitted',
    'under_review',
    'interview_scheduled',
    'interview_completed',
    'final_review',
    'accepted',
    'rejected'
  )
),
ADD COLUMN IF NOT EXISTS contact_date timestamptz,
ADD COLUMN IF NOT EXISTS status_updated_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS notes text;

-- Create function to automatically update status_updated_at
CREATE OR REPLACE FUNCTION update_status_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.status_updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update status_updated_at when status changes
CREATE TRIGGER update_application_status_timestamp
  BEFORE UPDATE OF status_stage
  ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_status_updated_at();