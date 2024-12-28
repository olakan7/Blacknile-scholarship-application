import { type ApplicationStage } from '../types/application';
import { CheckCircle, Clock, FileSearch, UserCheck, Users } from 'lucide-react';

const stages: { [K in ApplicationStage]: { label: string; icon: JSX.Element; color: string } } = {
  submitted: {
    label: 'Application Submitted',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-gray-500'
  },
  under_review: {
    label: 'Under Review',
    icon: <FileSearch className="w-5 h-5" />,
    color: 'text-blue-500'
  },
  interview_scheduled: {
    label: 'Interview Scheduled',
    icon: <Clock className="w-5 h-5" />,
    color: 'text-purple-500'
  },
  interview_completed: {
    label: 'Interview Completed',
    icon: <UserCheck className="w-5 h-5" />,
    color: 'text-indigo-500'
  },
  final_review: {
    label: 'Final Review',
    icon: <Users className="w-5 h-5" />,
    color: 'text-orange-500'
  },
  accepted: {
    label: 'Application Accepted',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-green-500'
  },
  rejected: {
    label: 'Application Rejected',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-red-500'
  }
};

const stageOrder: ApplicationStage[] = [
  'submitted',
  'under_review',
  'interview_scheduled',
  'interview_completed',
  'final_review',
  'accepted'
];

interface ApplicationStatusProps {
  currentStage: ApplicationStage;
  updatedAt: string;
  contactDate?: string;
}

export default function ApplicationStatus({ 
  currentStage, 
  updatedAt,
  contactDate 
}: ApplicationStatusProps) {
  const currentStageIndex = stageOrder.indexOf(currentStage);
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-between">
          {stageOrder.map((stage, index) => {
            const isCurrent = stage === currentStage;
            const isCompleted = stageOrder.indexOf(stage) < currentStageIndex;
            const stageInfo = stages[stage];
            
            return (
              <div
                key={stage}
                className={`flex flex-col items-center ${
                  isCompleted || isCurrent ? stageInfo.color : 'text-gray-400'
                }`}
              >
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white border-2 flex items-center justify-center">
                    {stageInfo.icon}
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-center">
                  {stageInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
        {contactDate && (
          <p>Contact date: {new Date(contactDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}