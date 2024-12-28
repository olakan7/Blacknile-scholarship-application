import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FileText, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import ApplicationStatus from '../components/ApplicationStatus';
import type { Application } from '../types/application';

export default function StudentDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <Link to="/apply">
          <Button className="inline-flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            New Application
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new application.
          </p>
          <div className="mt-6">
            <Link to="/apply">
              <Button className="inline-flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div key={application.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Application Status
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Submitted on {new Date(application.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <ApplicationStatus
                  currentStage={application.status_stage}
                  updatedAt={application.status_updated_at}
                  contactDate={application.contact_date}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}