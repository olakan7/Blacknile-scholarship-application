import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData } from '../schemas/applicationSchema';
import FormField from '../components/forms/FormField';
import FormTextArea from '../components/forms/FormTextArea';
import FormFileUpload from '../components/forms/FormFileUpload';
import AddressFields from '../components/forms/AddressFields';
import DocumentUploadSection from '../components/forms/DocumentUploadSection';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useApplicationSubmit } from '../hooks/useApplicationSubmit';
import { DOCUMENT_TYPES } from '../types/documents';

export default function ApplicationForm() {
  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      documents: {}
    }
  });

  const { submitApplication, loading, error } = useApplicationSubmit();

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      await submitApplication(data);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            The Blacknile Foundation for Education and Human Wellness
          </h1>
          <h2 className="text-xl text-gray-600 mt-2">
            Scholarship Application Form
          </h2>
        </div>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <ErrorMessage message={error} />
            
            {/* Rest of the form remains the same */}
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  name="firstName"
                  label="First Name"
                  required
                />
                <FormField
                  name="lastName"
                  label="Last Name"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  name="email"
                  label="Email"
                  type="email"
                  required
                />
                <FormField
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  required
                />
                <FormField
                  name="currentSchool"
                  label="Current School"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
              <AddressFields />
            </div>

            {/* Academic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h2>
              <div className="space-y-6">
                <FormField
                  name="gpa"
                  label="GPA"
                  type="number"
                  required
                  min={0}
                  max={4}
                  step={0.01}
                />
                <FormTextArea
                  name="essay"
                  label="Personal Essay"
                  required
                  placeholder="Write your essay here... (minimum 100 characters)"
                />
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h2>
              <div className="space-y-6">
                <FormFileUpload
                  name="studentIdFile"
                  label="Student ID"
                  accept="image/*,.pdf"
                  helperText="Upload a clear photo or scan of your student ID (PDF or image)"
                />
                <FormFileUpload
                  name="nationalIdFile"
                  label="National ID"
                  accept="image/*,.pdf"
                  helperText="Upload a clear photo or scan of your national ID (PDF or image)"
                />
              </div>
            </div>

            {/* Additional Documents */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Documents</h2>
              <DocumentUploadSection documents={DOCUMENT_TYPES} />
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              loadingText="Submitting..."
              className="mt-8"
            >
              Submit Application
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}