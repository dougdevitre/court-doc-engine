/**
 * Court Document Automation Engine — Entry Point
 *
 * Re-exports all modules so consumers can import from a single package.
 * Example: import { InterviewEngine, PdfGenerator } from '@justice-os/court-doc-engine';
 */

export * from './interview/engine';
export * from './interview/questions';
export * from './forms/auto-fill';
export * from './forms/validator';
export * from './templates/registry';
export * from './generator/pdf';
export * from './generator/docx';
