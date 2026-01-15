# M&M Land Company Website

A premium land listing website for properties in Ohio and West Virginia.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Managing Listings

Property listings are stored in `data/listings.json`.

**To update listings:**
1. Edit `data/listings.json`
2. Commit and push to GitHub
3. Site rebuilds automatically (or run manually via GitHub Actions)

**To add photos:**
1. Create folder: `public/images/listings/[slug]/`
2. Add images: `thumbnail.jpg`, `1.jpg`, `2.jpg`, etc.

See [HOW_TO_UPDATE_WEBSITE.md](./HOW_TO_UPDATE_WEBSITE.md) for details.

## Features

- **Home Page**: Hero section, featured listings, company info, process overview
- **Listings Page**: Filterable grid of all properties with advanced search
- **Listing Detail Pages**: Photo galleries, property details, maps, video tours
- **Contact Forms**: Modal-based contact and sell-your-land forms
- **Responsive Design**: Mobile-first, optimized for all devices

## Project Structure

```
M-MlandLCC/
├── app/                    # Next.js app directory (pages and routing)
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (navbar, footer)
│   ├── listings/           # Listing-specific components
│   ├── home/               # Home page sections
│   └── forms/              # Form modals
├── data/
│   └── listings.json       # Property listings data
├── lib/                    # Utilities
│   ├── api.ts              # API functions
│   ├── listings.ts         # Listings data loader
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # App constants
├── hooks/                  # Custom React hooks
└── public/
    └── images/
        └── listings/       # Property photos (organized by slug)
```

## Customization

### Changing Content

1. **Company Information**: Edit `lib/constants.ts`
2. **Listings**: Edit `data/listings.json`
3. **Images**: Add to `public/images/listings/[slug]/`

### Changing Design

1. **Colors**: Edit `tailwind.config.ts`
2. **Typography**: Edit `app/layout.tsx`

## Build for Production

```bash
npm run build
```

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management
- **Zod** - Schema validation

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions:
- **Automatic**: Daily at 3 AM Eastern
- **Manual**: Run workflow from Actions tab

**Live site**: https://jkeith3725.github.io/M-MlandLCC
