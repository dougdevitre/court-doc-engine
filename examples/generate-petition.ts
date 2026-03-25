/**
 * Example: Generate a Court Petition
 *
 * Demonstrates the full workflow: start a guided interview,
 * answer questions, validate, and generate filing-ready documents.
 */

import { InterviewEngine } from '../src/interview/engine';

async function main() {
  const engine = new InterviewEngine();

  // ------------------------------------------------------------------
  // 1. Start an interview for an eviction petition in Missouri
  // ------------------------------------------------------------------
  const session = await engine.startInterview('eviction-petition', {
    jurisdiction: 'MO',
  });

  console.log(`Interview started: ${session.getInterviewId()}`);
  console.log(`Total questions: ${session.getTotalSteps()}`);

  // ------------------------------------------------------------------
  // 2. Walk through the questions
  // ------------------------------------------------------------------

  // Get the first question
  let question = session.getCurrentQuestion();
  console.log(`\nQ: ${question?.label}`);

  // Provide answers (in a real app these come from the UI)
  await session.answer('plaintiff_name', 'Jane Smith');
  await session.answer('plaintiff_address', '456 Oak Ave, Springfield, MO 65802');
  await session.answer('plaintiff_phone', '555-0123');
  await session.answer('defendant_name', 'John Doe');
  await session.answer('property_address', '123 Main St, Apt 4B, Springfield, MO 65801');
  await session.answer('lease_start_date', '2024-01-01');
  await session.answer('lease_monthly_rent', 1200);
  await session.answer('grounds', 'nonpayment');
  await session.answer('amount_owed', 2400);
  await session.answer('notice_served_date', '2025-02-01');
  await session.answer('notice_type', '10-day');

  console.log(`\nProgress: ${session.getProgress()}%`);

  // ------------------------------------------------------------------
  // 3. Validate that all required fields are filled
  // ------------------------------------------------------------------
  const validation = session.validate();

  if (!validation.isValid) {
    console.error('Validation failed:');
    for (const error of validation.errors) {
      console.error(`  - ${error.field}: ${error.message}`);
    }
    process.exit(1);
  }

  console.log('All fields validated successfully.');

  // ------------------------------------------------------------------
  // 4. Generate filing-ready documents
  // ------------------------------------------------------------------
  const filingPackage = await session.generate({
    formats: ['pdf', 'docx'],
    includeChecklist: true,
  });

  console.log(`\nGenerated ${filingPackage.documents.length} document(s):`);
  for (const doc of filingPackage.documents) {
    console.log(`  - ${doc.fileName} (${doc.format}, ${doc.sizeBytes} bytes)`);
  }

  console.log(`\nFiling Checklist (${filingPackage.checklist.length} steps):`);
  for (const step of filingPackage.checklist) {
    console.log(`  ${step.order}. ${step.instruction}`);
  }

  // ------------------------------------------------------------------
  // 5. Save / resume demo
  // ------------------------------------------------------------------
  const serialized = session.serialize();
  console.log(`\nSerialized state: ${serialized.length} bytes`);

  // Restore from serialized state
  const restored = await engine.resumeInterview(serialized);
  console.log(`Resumed interview: ${restored.getInterviewId()}`);
  console.log(`Progress after resume: ${restored.getProgress()}%`);
}

main().catch(console.error);
