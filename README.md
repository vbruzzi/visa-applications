## General Overview

- Public routes are all on the root of the application (`/src/app`).
- Data that the app reads and writes all go through the `/src/data` folder.
  - `form-schema.json` holds the schema for the public form so that it can be updated on the fly.
  - `leads.json` contains all the public submissions.
  - `/uploads` holds user resumes from the public form.
- Only `/lib/backend` interacts with the JSON files, making it possible to replace those with an actual database and file store.
- Internal/authenticated routes are all in the /app directory (`/src/app/app`). `middleware.js` enforces that authentication.
- If you attempt to go to an authenticated section without an active session, you are redirected to the login page.
- There are currently only two username/password combinations that are hardcoded to be able to login:
  - admin/pw -> Can login and has permission to access the rest of the application.
  - other/pw -> Can login but does not have permission to access the rest of the application. This user is immediately logged out because of that.
- Status updates on the leads table currently do not write anywhere. They are structured in a way that could be used with optimistic updates.

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
