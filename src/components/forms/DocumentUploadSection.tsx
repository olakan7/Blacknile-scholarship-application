import { DocumentType } from '../../types/documents';
import FormFileUpload from './FormFileUpload';

interface DocumentUploadSectionProps {
  documents: DocumentType[];
}

export default function DocumentUploadSection({ documents }: DocumentUploadSectionProps) {
  return (
    <div className="space-y-6">
      {documents.map((doc) => (
        <FormFileUpload
          key={doc.id}
          name={`documents.${doc.id}`}
          label={doc.label}
          required={doc.required}
          accept={doc.accept}
          helperText={doc.description}
        />
      ))}
    </div>
  );
}