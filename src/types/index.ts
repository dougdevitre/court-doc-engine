/**
 * Court Document Engine — Shared Type Definitions
 */

/** A document template */
export interface Template {
  id: string;
  jurisdiction: string;
  caseType: string;
  documentType: string;
  version: string;
  placeholders: string[];
  filePath: string;
}

/** Interview answer */
export interface InterviewAnswer {
  questionId: string;
  value: string | string[] | boolean | Date;
}

/** Completed interview session */
export interface InterviewSession {
  id: string;
  caseType: string;
  jurisdiction: string;
  answers: InterviewAnswer[];
  completedAt?: Date;
}

/** Validation result for a form */
export interface ValidationResult {
  isValid: boolean;
  errors: FieldError[];
}

/** A single field validation error */
export interface FieldError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Generated document output */
export interface GeneratedDocument {
  fileName: string;
  format: 'pdf' | 'docx';
  buffer: Buffer;
  generatedAt: Date;
}

/** Filing package with documents and checklist */
export interface FilingPackage {
  documents: GeneratedDocument[];
  checklist: ChecklistItem[];
}

/** Filing checklist item */
export interface ChecklistItem {
  label: string;
  description: string;
  completed: boolean;
}
