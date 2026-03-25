# Adding Jurisdiction Templates

## Template Structure

Each jurisdiction template is a directory containing:

```
jurisdictions/
├── missouri/
│   ├── manifest.json       # Jurisdiction metadata
│   ├── family/
│   │   ├── petition.docx   # Template with placeholders
│   │   ├── response.docx
│   │   └── motion.docx
│   └── civil/
│       ├── petition.docx
│       └── summons.docx
├── california/
│   └── ...
```

## Manifest Format

```json
{
  "jurisdiction": "Missouri",
  "stateCode": "MO",
  "courts": ["Circuit Court", "Associate Circuit Court"],
  "caseTypes": ["family", "civil", "small-claims"],
  "lastUpdated": "2026-01-15",
  "contributor": "Your Name"
}
```

## Placeholder Syntax

Use double curly braces for variable placeholders:

- `{{petitioner.name}}` — party name
- `{{case.number}}` — case number
- `{{filing.date}}` — formatted date
- `{{court.name}}` — court name

## Contributing Templates

1. Create a directory for your jurisdiction
2. Add a `manifest.json` with metadata
3. Add document templates with placeholders
4. Test with the template validator: `npm run validate-templates`
5. Submit a pull request

## Guidelines

- Use official court form formats where available
- Include all required fields as placeholders
- Test with sample data before submitting
- Note the last date the template was verified against court requirements
