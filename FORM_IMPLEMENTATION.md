# Visa Application Form Implementation

## Overview

The leads form has been implemented using **JSON Forms** with **Vanilla Renderers** and **Tailwind CSS** styling.

## How It Works

Form schema is stored in `src/data/form-schema.json`. The app will request the form schema from the server action, which reads from that file.

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

TODO: The FormDisplay type allows an icon and header to be shown. This should probably be updated before going to prod, it likely has some accessibility issues. Maybe the icon can be passed as an option on the form label instead?
