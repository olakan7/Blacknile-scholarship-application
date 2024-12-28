export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export type ApplicationStage = 
  | 'submitted'
  | 'under_review'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'final_review'
  | 'accepted'
  | 'rejected';

export interface Application {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: ApplicationStatus;
  status_stage: ApplicationStage;
  contact_date?: string;
  status_updated_at: string;
  notes?: string;
  created_at: string;
}