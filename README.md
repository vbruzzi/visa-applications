## General Overview

- Public routes are all on the root of the application (`/src/app`).
- Data that the app reads and writes all go through the `/src/data` folder.
  - `form-schema.json` holds the schema for the public form so that it can be updated on the fly.
  - `leads.json` contains all the public submissions. The backup file is in case we want to reset the "store".
  - `/uploads` holds user resumes from the public form.
- All interactions with any data stores are done through `/lib/backend`, making it possible to swap out services as needed. Right now, data is stored in JSON files locally in `/src/data`, but the same interface would work for S3 and Postgres.
- Internal/authenticated routes are all in the /app directory (`/src/app/app`). `middleware.js` enforces that authentication.
- Going to an internal section of the app without an active session will automatically redirect the user to the login page.
- There are currently only two username/password combinations that are hardcoded to be able to login:
  - admin/pw -> Can login and has permission to access the rest of the application.
  - other/pw -> Can login but does not have permission to access the rest of the application. This user is immediately logged out because of that.
- The authentication and authorization is abstracted to `has-permission.ts` and `verify-credentials.ts`. This allows us to later implement a more sophisticated SSO and ACL system.
- Status updates on the leads table currently do not write anywhere. They only update the global state in zustand, that would ideally allow us to make optimistic updates.

## Running the application

1. Install Node 22.
2. Run `npm i`.
3. Start the development instance with `npm run dev`.

## General Requirements

- [x] Next.js
- [x] CSS/CSS-in-JS
- [x] \*Mocked API calls use Next.js API
- [x] \*Unit tests - sort of
- [x] \*Responsive web pages
- [x] \*Typescript
- [ ] \*Document system design

## Pages

- [x] Public form for prospects
  - [x] Matches design
  - [x] Has fields: First name, last name, email, country of citizenship, LinkedIn/personal website, visas you're interested in, resume upload, text area comments/notes
  - [x] Form validation
  - [x] File upload for CV
  - [x] \*Json Forms w/ customizable forms
  - [x] \*Form validation feedback/error helpers
- [x] Confirmation page after submission
  - [x] Redirect back home button
  - [x] Matches design
- [x] Internal page for viewing and updating prospect status
  - [x] Secured behind auth
  - [x] Matches design
  - [x] Search bar
  - [x] Status filter
  - [x] Table with Name, submitted (date), status, country
  - [x] button on row that allows change the status on table
  - [x] Paginated table
  - [x] Shows list of prospects
  - [x] \*State management library for handling prospect state

* = Bonus
