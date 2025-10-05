# Visa Application Form Implementation

## Overview

The leads form has been implemented using **JSON Forms** with **Vanilla Renderers** and **Tailwind CSS** styling.

## Location

- **Form Page**: `/src/app/app/leads/page.tsx`
- **Custom Styles**: `/src/app/app/leads/jsonforms-styles.css`

## Features Implemented

### ✅ Required Fields (from README.md)

1. **First Name** - Text input with validation
2. **Last Name** - Text input with validation
3. **Email** - Email input with format validation
4. **Visas You're Interested In** - Multi-select checkboxes with options:
   - Work Visa
   - Student Visa
   - Tourist Visa
   - Business Visa
   - Family Visa
   - Other
5. **Resume Upload** - File upload input for CV
6. **Comments/Notes** - Textarea for additional information

### ✅ Form Validation

- All required fields are marked with asterisk (\*)
- Real-time validation feedback
- Email format validation
- Minimum length validation for name fields
- At least one visa type must be selected
- Error messages displayed in a styled error box

### ✅ JSON Forms Implementation

- **JSON Schema** - Defines data structure and validation rules
- **UI Schema** - Defines form layout (horizontal layout for first/last name)
- **Vanilla Renderers** - Pre-built form controls
- **Custom CSS** - Tailwind-based styling for professional appearance

## How It Works

### 1. JSON Schema

Defines the data structure:

```typescript
{
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'visas'],
  properties: {
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    visas: { type: 'array', items: { enum: [...] } },
    // ...
  }
}
```

### 2. UI Schema

Defines the layout:

```typescript
{
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',  // First and Last name side-by-side
      elements: [...]
    },
    // Other fields vertically
  ]
}
```

### 3. State Management

- Form data is stored in React state
- Real-time validation errors are tracked
- Form submission ready with API integration point

## Next Steps

### To Test the Form

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/app/leads`
3. Fill out the form and test validation

### To Connect to API

Update the `handleSubmit` function in `page.tsx`:

```typescript
const response = await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

### Recommended Enhancements

1. **File Upload Handler** - Currently the file input stores filename as string. Implement actual file upload to cloud storage (AWS S3, Azure Blob, etc.)
2. **Success Redirect** - Uncomment and implement redirect to confirmation page
3. **Loading States** - Add spinner/loading indicator during submission
4. **Form Persistence** - Save draft to localStorage
5. **Better Error Messages** - Customize error messages for better UX

## Styling Customization

All form styles are in `jsonforms-styles.css` using Tailwind's `@apply` directive. You can easily customize:

- Input field appearance
- Validation error styling
- Checkbox styling
- Layout spacing
- Color scheme

## Dependencies

- `@jsonforms/core` - Core JSON Forms functionality
- `@jsonforms/react` - React bindings
- `@jsonforms/vanilla-renderers` - Pre-built form renderers
- `next` - Next.js framework
- `react` - React library
- `tailwindcss` - Utility-first CSS framework
