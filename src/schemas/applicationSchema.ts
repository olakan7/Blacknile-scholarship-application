import { z } from 'zod';
import { DOCUMENT_TYPES } from '../types/documents';

const documentSchema = z.record(
  z.string(),
  z.any().optional()
);

export const applicationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  dateOfBirth: z.coerce.date()
    .refine((date) => {
      return date <= new Date() && date >= new Date('1900-01-01');
    }, 'Invalid date of birth'),
  currentSchool: z.string()
    .min(2, 'School name must be at least 2 characters')
    .max(100, 'School name must be less than 100 characters'),
  address: z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().optional(), // Made optional
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
  gpa: z.coerce.number()
    .min(0, 'GPA must be at least 0')
    .max(4, 'GPA must be at most 4')
    .multipleOf(0.01, 'GPA must have at most 2 decimal places'),
  essay: z.string()
    .min(100, 'Essay must be at least 100 characters')
    .max(5000, 'Essay must be less than 5000 characters'),
  studentIdFile: z.any().optional(),
  nationalIdFile: z.any().optional(),
  documents: documentSchema,
});