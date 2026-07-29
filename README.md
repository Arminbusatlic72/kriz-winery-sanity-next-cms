# Kriz Winery Website

The website and content management system for [Kriz Winery](https://krizwine.com).
The public site is available in Croatian and English and is backed by Sanity CMS.

## Project Structure

This repository is an npm workspace with two applications:

- `frontend/` - Next.js 16 website, API routes, localization, and Resend email integration
- `studio/` - Sanity Studio for managing pages, products, posts, news, and site settings

## Tech Stack

- Next.js App Router and React
- TypeScript
- Sanity CMS and Visual Editing
- `next-intl` for Croatian and English localization
- Tailwind CSS
- Resend and React Email for contact-form notifications
- Jest and Testing Library

## Local Development

### Requirements

- Node.js 20 or newer
- npm
- Access to the project's Sanity dataset
- A Resend account for testing contact-form email

Install dependencies from the repository root:

```bash
npm install
```

Start the website and Sanity Studio together:

```bash
npm run dev
```

The applications run at:

- Website: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3333](http://localhost:3333)

To run only one application:

```bash
npm run dev:next
npm run dev:studio
```

## Environment Variables

Environment files contain credentials and are ignored by Git. Do not commit them.

### Frontend

Create `frontend/.env.local`:

```dotenv
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=

# Public website
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form
RESEND_API_KEY=
RESEND_FROM_EMAIL=Vinarija Kriz <website@krizwine.com>
TEAM_EMAIL=vinarija.kriz@gmail.com
```

`RESEND_FROM_EMAIL` must use a domain verified in Resend. The production domain is
`krizwine.com`; its DKIM and SPF records must remain valid.

### Sanity Studio

Create `studio/.env.local`:

```dotenv
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_STUDIO_STUDIO_HOST=
```

## Useful Commands

Run commands from the repository root:

```bash
npm run dev          # Start the frontend and Studio
npm run type-check   # Type-check both workspaces
npm run lint         # Lint the frontend
npm test --workspace=frontend
npm run build --workspace=frontend
npm run build --workspace=studio
```

Run a single test file:

```bash
npm test --workspace=frontend -- --runInBand __tests__/api/email/route.test.ts
```

Format the repository:

```bash
npm run format
```

## Content and Localization

Sanity schemas live in `studio/src/schemaTypes/`. Changes to schemas should be tested
in Studio and followed by regenerated frontend types when applicable:

```bash
npm run typegen --workspace=frontend
```

Static interface translations are stored in:

- `frontend/messages/hr.json`
- `frontend/messages/en.json`

When adding a translation key, add it to both files.

## Contact Email Flow

The contact form posts to `frontend/app/api/email/route.ts`.

1. The winery receives the customer's message at `TEAM_EMAIL`.
2. The customer receives a confirmation email.
3. Replies to the winery notification are addressed directly to the customer.

For production troubleshooting, check the function logs and the Resend Emails dashboard.
The most common configuration issues are a missing environment variable, an invalid API
key, or a sender address that does not match the verified Resend domain.

## Deployment

### Frontend

The frontend is deployed to Vercel with `frontend/` configured as the project root.
Add all frontend environment variables in Vercel for the Production environment before
deploying. Environment variable changes require a redeployment.

Pushing to the production branch normally triggers a Vercel deployment.

### Sanity Studio

Deploy Studio from the repository root:

```bash
npm run deploy --workspace=studio
```

## Production Checklist

Before deploying:

```bash
npm run type-check
npm test --workspace=frontend
npm run build --workspace=frontend
```

After deploying:

1. Check both Croatian and English routes.
2. Submit the contact form with a real email address.
3. Confirm delivery to `vinarija.kriz@gmail.com`.
4. Confirm the customer receives the acknowledgement email.
5. Verify recent requests in the Resend Emails dashboard.

## Documentation

- [Next.js documentation](https://nextjs.org/docs)
- [Sanity documentation](https://www.sanity.io/docs)
- [Resend documentation](https://resend.com/docs)
- [next-intl documentation](https://next-intl.dev/docs)
