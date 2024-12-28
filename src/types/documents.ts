export type DocumentType = {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
};

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'transcripts',
    label: 'Academic Transcripts',
    description: 'Official transcripts from your current institution',
    accept: '.pdf',
  },
  {
    id: 'recommendationLetter',
    label: 'Letter of Recommendation',
    description: 'Letter from a teacher or academic advisor',
    accept: '.pdf,.doc,.docx',
  },
  {
    id: 'certifications',
    label: 'Certifications',
    description: 'Any relevant academic or professional certifications',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'Showcase of your work or achievements',
    accept: '.pdf,.zip',
  }
];