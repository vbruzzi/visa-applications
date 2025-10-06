# Unit Tests

This directory contains comprehensive Jest unit tests for the visa application project.

## Setup

### Install Dependencies

```bash
npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Configuration Files

The following files have been created for Jest:

- `jest.config.js` - Jest configuration
- `jest.setup.ts` - Test environment setup
- `.test.ts` or `.test.tsx` - Test files

### Add Test Script

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test button.test
```

## Test Files

### Component Tests

- **button.test.tsx** - Tests for Button component logic including variants, click handling, and disabled states (8 tests)
- **text-input.test.ts** - Tests for TextInput validation, placeholder logic, and error handling (11 tests)
- **select-input.test.ts** - Tests for SelectInput placeholder, validation, and styling logic (9 tests)
- **checkbox-group-renderer.test.ts** - Tests for checkbox selection, state management, and validation (11 tests)
- **file-upload-renderer.test.ts** - Tests for file parsing, type validation, and extension checking (15 tests)

### Library Tests

- **session.test.ts** - Tests for session encryption/decryption using base64 (8 tests)
- **form-validation.test.ts** - Tests for form validation including email, required fields, and complete form validation (19 tests)

## Test Coverage

**Total: 81 unit tests** covering:

- ✅ Input validation logic
- ✅ Component state management
- ✅ Form validation rules
- ✅ Session encryption/decryption
- ✅ File upload processing
- ✅ Error handling
- ✅ Edge cases and boundary conditions

## Test Structure

All tests follow Jest best practices:

- Organized with `describe` blocks for test suites
- Individual tests with `it` or `test` statements
- Clear, descriptive test names
- Comprehensive assertions using `expect`
- Isolated test logic
