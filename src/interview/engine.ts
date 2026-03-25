/**
 * Interview Engine
 *
 * Drives the guided step-by-step interview process. Manages question
 * flow, branching logic, and answer collection. Supports save/resume
 * for incomplete interviews.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Types of input a question can collect */
export type QuestionType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect' | 'address';

/** A single question in the interview tree */
export interface InterviewQuestion {
  /** Unique key for this question (used as the answer key) */
  key: string;
  /** Human-readable label displayed to the user */
  label: string;
  /** Optional help text or tooltip */
  helpText?: string;
  /** Input type */
  type: QuestionType;
  /** Whether an answer is required to proceed */
  required: boolean;
  /** Options for select / multiselect types */
  options?: Array<{ value: string; label: string }>;
  /** Condition that must be true for this question to appear */
  showWhen?: BranchCondition;
}

/** A condition that controls branching logic */
export interface BranchCondition {
  /** The answer key to evaluate */
  field: string;
  /** Comparison operator */
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'in' | 'notIn' | 'exists';
  /** Value to compare against */
  value: unknown;
}

/** Configuration for starting a new interview */
export interface InterviewConfig {
  /** US jurisdiction code (e.g. 'MO', 'CA', 'FEDERAL') */
  jurisdiction: string;
  /** Optional pre-filled answers (e.g. from case data) */
  prefill?: Record<string, unknown>;
}

/** Validation error for a single field */
export interface ValidationError {
  field: string;
  message: string;
}

/** Result of validating the collected answers */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/** Format options for document generation */
export interface GenerateOptions {
  /** Output formats to produce */
  formats: Array<'pdf' | 'docx'>;
  /** Whether to include a filing checklist */
  includeChecklist?: boolean;
}

/** A generated document in the filing package */
export interface GeneratedDocument {
  fileName: string;
  format: 'pdf' | 'docx';
  content: Buffer;
  sizeBytes: number;
}

/** A single step in the filing checklist */
export interface ChecklistStep {
  order: number;
  instruction: string;
  details?: string;
}

/** The complete filing-ready output package */
export interface FilingPackage {
  documents: GeneratedDocument[];
  checklist: ChecklistStep[];
  interviewId: string;
  generatedAt: Date;
}

// ---------------------------------------------------------------------------
// Interview Session
// ---------------------------------------------------------------------------

/**
 * An active interview session. Created by `InterviewEngine.startInterview()`.
 * Tracks the current position in the question tree, collected answers,
 * and supports serialization for save/resume.
 */
export class InterviewSession {
  private interviewId: string;
  private questions: InterviewQuestion[];
  private answers: Map<string, unknown>;
  private currentIndex: number;

  constructor(
    interviewId: string,
    questions: InterviewQuestion[],
    answers?: Map<string, unknown>,
    currentIndex?: number,
  ) {
    this.interviewId = interviewId;
    this.questions = questions;
    this.answers = answers ?? new Map();
    this.currentIndex = currentIndex ?? 0;
  }

  /**
   * Get the unique identifier for this interview session.
   */
  getInterviewId(): string {
    return this.interviewId;
  }

  /**
   * Get the total number of questions in this interview
   * (including conditionally hidden ones).
   */
  getTotalSteps(): number {
    return this.questions.length;
  }

  /**
   * Get the current question. Returns `null` if the interview is complete.
   */
  getCurrentQuestion(): InterviewQuestion | null {
    throw new Error('Not implemented');
  }

  /**
   * Record an answer for a given question key and advance to the next
   * applicable question (respecting branching conditions).
   *
   * @param key - The question key.
   * @param value - The user's answer.
   */
  async answer(key: string, value: unknown): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Go back to the previous question, preserving the existing answer.
   */
  goBack(): InterviewQuestion | null {
    throw new Error('Not implemented');
  }

  /**
   * Get progress as a percentage (0-100).
   */
  getProgress(): number {
    throw new Error('Not implemented');
  }

  /**
   * Validate all collected answers against the question definitions.
   * Checks required fields, type constraints, and cross-field rules.
   */
  validate(): ValidationResult {
    throw new Error('Not implemented');
  }

  /**
   * Generate filing-ready documents from the collected answers.
   *
   * @param options - Output format and checklist preferences.
   * @returns A FilingPackage containing documents and a filing checklist.
   */
  async generate(options: GenerateOptions): Promise<FilingPackage> {
    throw new Error('Not implemented');
  }

  /**
   * Serialize the session state to a JSON string for save/resume.
   */
  serialize(): string {
    throw new Error('Not implemented');
  }
}

// ---------------------------------------------------------------------------
// Interview Engine
// ---------------------------------------------------------------------------

export class InterviewEngine {
  /**
   * Start a new guided interview for a specific document type.
   *
   * @param templateId - The template identifier (e.g. `'eviction-petition'`).
   * @param config - Jurisdiction and optional pre-filled data.
   * @returns An InterviewSession ready to accept answers.
   *
   * @example
   * ```ts
   * const engine = new InterviewEngine();
   * const session = await engine.startInterview('eviction-petition', {
   *   jurisdiction: 'MO',
   * });
   * ```
   */
  async startInterview(templateId: string, config: InterviewConfig): Promise<InterviewSession> {
    throw new Error('Not implemented');
  }

  /**
   * Resume a previously saved interview from its serialized state.
   *
   * @param serialized - JSON string from `InterviewSession.serialize()`.
   * @returns A restored InterviewSession at the saved position.
   */
  async resumeInterview(serialized: string): Promise<InterviewSession> {
    throw new Error('Not implemented');
  }

  /**
   * List all available interview templates, optionally filtered by jurisdiction.
   *
   * @param jurisdiction - Optional jurisdiction code to filter by.
   */
  async listTemplates(jurisdiction?: string): Promise<Array<{ id: string; name: string; jurisdiction: string }>> {
    throw new Error('Not implemented');
  }

  /**
   * Register a new interview template (for community contributions).
   *
   * @param template - The template definition including questions and metadata.
   */
  async registerTemplate(template: {
    id: string;
    name: string;
    jurisdiction: string;
    questions: InterviewQuestion[];
  }): Promise<void> {
    throw new Error('Not implemented');
  }
}
