/**
 * Question Definitions
 *
 * Defines the question library used by the Interview Engine.
 * Each question has a type, prompt text, validation rules,
 * and optional branching conditions.
 */

export interface Question {
  id: string;
  prompt: string;
  type: 'text' | 'select' | 'date' | 'yesno' | 'multiselect';
  required: boolean;
  options?: string[];
  branchOn?: Record<string, string>; // answer value → next question ID
}

// TODO: Define common question sets:
//   - Party information (name, address, contact)
//   - Case type selection
//   - Jurisdiction selection
//   - Filing details
//   - Relief requested

export const questions: Question[] = [];
