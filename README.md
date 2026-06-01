# ToggleBase

A curated, open-source reference of privacy and security settings for popular apps. Filter by operating system, pick an app, and get a focused list of recommended toggles — each with the exact click path and a plain-English explanation of why it matters.

## Features

- Filter apps by OS (iOS, Android, macOS, Windows, Linux)
- Search across app names and summaries
- Per-setting click paths so you know exactly where to go
- Impact descriptions explaining what each setting actually protects

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

## Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Build

```bash
npm run build   # production build
npm start       # serve the production build locally
```

## Adding apps

App data lives in [app/data/apps.ts](app/data/apps.ts). Each entry follows the `PrivacyApp` type — add a new object to the `privacyApps` array with an id, name, icon abbreviation, summary, supported OS list, and an array of settings.

## License

[LICENSE](LICENSE)
