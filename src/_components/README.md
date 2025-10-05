# Custom JSON Forms Renderers

This folder contains custom renderer components for JSON Forms with Tailwind CSS styling.

## Overview

These components are **JSON Forms renderers** that replace the default vanilla renderers with custom-styled components using Tailwind CSS. They integrate seamlessly with JSON Forms' declarative form generation.

## Components

### TextFieldRenderer

Renders standard text input fields.

**Tester Priority:** 3  
**Applies to:** String controls (default)

**Features:**

- Tailwind-styled text input
- Validation error display
- Required field indicator (red asterisk)
- Focus states with blue ring

---

### EmailFieldRenderer

Renders email input fields with email validation.

**Tester Priority:** 4  
**Applies to:** String controls with `format: 'email'` in schema

**Features:**

- HTML5 email input type
- Built-in email format validation
- Same styling as TextField

**Schema Example:**

```json
{
  "email": {
    "type": "string",
    "format": "email",
    "title": "Email"
  }
}
```

---

### UrlFieldRenderer

Renders URL input fields for website addresses.

**Tester Priority:** 4  
**Applies to:** String controls with `format: 'uri'` in schema

**Features:**

- HTML5 URL input type
- Placeholder: "https://"
- URL format validation

**Schema Example:**

```json
{
  "website": {
    "type": "string",
    "format": "uri",
    "title": "Personal Website"
  }
}
```

---

### TextAreaRenderer

Renders multi-line text areas.

**Tester Priority:** 4  
**Applies to:** String controls with specific titles (customizable)

**Features:**

- Multi-line textarea (5 rows default)
- Displays description text below label
- Resizable textarea

**Schema Example:**

```json
{
  "comments": {
    "type": "string",
    "title": "How can we help you?",
    "description": "Please provide details..."
  }
}
```

**UI Schema:**

```json
{
  "type": "Control",
  "scope": "#/properties/comments",
  "options": {
    "multi": true,
    "rows": 5
  }
}
```

---

### CheckboxGroupRenderer

Renders multiple checkboxes from enum values.

**Tester Priority:** 5  
**Applies to:** Array controls with `format: 'checkbox'` in UI schema

**Features:**

- Multiple selection checkboxes
- Array of selected values
- Styled checkboxes with blue accent

**Schema Example:**

```json
{
  "visas": {
    "type": "array",
    "title": "Visas categories of interest?",
    "items": {
      "type": "string",
      "enum": ["O-1", "EB-1A", "EB-2 NIW", "I don't know"]
    },
    "uniqueItems": true,
    "minItems": 1
  }
}
```

**UI Schema:**

```json
{
  "type": "Control",
  "scope": "#/properties/visas",
  "options": {
    "format": "checkbox"
  }
}
```

---

### FileUploadRenderer

Renders file upload input.

**Tester Priority:** 5  
**Applies to:** String controls with `format: 'file'` in UI schema

**Features:**

- Styled file input button
- Shows selected filename
- Accepts .pdf, .doc, .docx files
- Blue-themed upload button

**Schema Example:**

```json
{
  "resume": {
    "type": "string",
    "title": "Resume Upload",
    "description": "Upload your CV/Resume"
  }
}
```

**UI Schema:**

```json
{
  "type": "Control",
  "scope": "#/properties/resume",
  "options": {
    "format": "file"
  }
}
```

---

## How It Works

### Tester Priority

Each renderer has a **tester** function that determines when it should be used. Higher numbers = higher priority.

- Priority 5: Most specific (CheckboxGroup, FileUpload)
- Priority 4: Format-specific (Email, URL, TextArea)
- Priority 3: Default fallback (TextField)

### Integration with JSON Forms

In your page component:

```tsx
import { JsonForms } from "@jsonforms/react";
import { vanillaCells } from "@jsonforms/vanilla-renderers";
import { customRenderers } from "@/_components";

<JsonForms
  schema={schema}
  uischema={uischema}
  data={data}
  renderers={customRenderers} // Use custom renderers
  cells={vanillaCells} // Keep vanilla cells
  onChange={({ data, errors }) => {
    // Handle changes
  }}
/>;
```

## Customization

All components use inline Tailwind classes. To customize:

1. **Colors:** Change `blue-600` to your brand color
2. **Spacing:** Adjust `mb-6`, `px-4`, `py-2`
3. **Border radius:** Modify `rounded-md`
4. **Focus ring:** Change `focus:ring-blue-500`

Example - Change to green theme:

```tsx
// Change this:
className = "text-blue-600 focus:ring-blue-500";

// To this:
className = "text-green-600 focus:ring-green-500";
```

## Adding New Renderers

To create a new custom renderer:

1. Create a new file in `_components/` (e.g., `DatePickerRenderer.tsx`)
2. Import necessary JSON Forms utilities:
   ```tsx
   import { ControlProps, rankWith } from "@jsonforms/core";
   import { withJsonFormsControlProps } from "@jsonforms/react";
   ```
3. Create your component with Tailwind styling
4. Export with a tester function
5. Add to `customRenderers` array in `index.ts`

## Benefits of This Approach

✅ **Declarative Forms:** Define form structure with JSON, not JSX  
✅ **Reusable Components:** Custom renderers work across all forms  
✅ **Validation Built-in:** JSON Schema handles all validation  
✅ **Type Safety:** TypeScript types from JSON Schema  
✅ **Maintainable:** Change form by editing schema, not components  
✅ **Tailwind Styling:** Clean, consistent design system

## Resources

- [JSON Forms Documentation](https://jsonforms.io/)
- [Custom Renderers Guide](https://jsonforms.io/docs/renderer-sets/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
