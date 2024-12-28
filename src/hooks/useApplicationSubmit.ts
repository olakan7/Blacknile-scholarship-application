import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { ApplicationFormData } from '../schemas/applicationSchema';

export function useApplicationSubmit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (bucket: string, file: File) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const submitApplication = async (data: ApplicationFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Format date as ISO string for database
      const formattedDate = data.dateOfBirth instanceof Date 
        ? data.dateOfBirth.toISOString()
        : new Date(data.dateOfBirth).toISOString();

      // Upload ID files if provided
      const studentIdUrl = data.studentIdFile?.[0] ? 
        await uploadFile('student-ids', data.studentIdFile[0]) : null;
      const nationalIdUrl = data.nationalIdFile?.[0] ? 
        await uploadFile('national-ids', data.nationalIdFile[0]) : null;

      // Upload additional documents
      const documentUrls: Record<string, string> = {};
      for (const [key, files] of Object.entries(data.documents || {})) {
        if (files?.[0]) {
          documentUrls[key] = await uploadFile('documents', files[0]);
        }
      }

      const { error: submitError } = await supabase
        .from('applications')
        .insert([{
          student_id: user.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          date_of_birth: formattedDate,
          current_school: data.currentSchool,
          address: data.address,
          gpa: data.gpa,
          essay: data.essay,
          student_id_url: studentIdUrl,
          national_id_url: nationalIdUrl,
          document_urls: documentUrls,
          status: 'pending'
        }]);

      if (submitError) throw submitError;
      
      navigate('/');
    } catch (err) {
      console.error('Application submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
}