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

## Features

- **Home Page**: Hero section, featured listings, company info, process overview
- **Listings Page**: Filterable grid of all properties with advanced search
- **Listing Detail Pages**: Photo galleries, property details, maps, video tours
- **Contact Forms**: Modal-based contact and sell-your-land forms
- **Responsive Design**: Mobile-first, optimized for all devices
- **Accessible**: WCAG compliant with keyboard navigation

## Project Structure

```
mm-land-company/
├── app/                    # Next.js app directory (pages and routing)
├── components/            # React components
│   ├── ui/               # Reusable UI components (buttons, inputs, etc.)
│   ├── layout/           # Layout components (navbar, footer)
│   ├── listings/         # Listing-specific components
│   ├── home/             # Home page sections
│   └── forms/            # Form modals
├── lib/                   # Utilities and data
│   ├── mockData.ts       # Sample listing data
│   ├── api.ts            # API functions (currently using mock data)
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Helper functions
│   └── constants.ts      # App constants
├── hooks/                 # Custom React hooks
├── public/               # Static files (images, etc.)
└── styles/               # Global styles

```

## Customization Guide

### Changing Content

1. **Company Information**: Edit `lib/constants.ts`
   - Company name, phone, email
   - "Why M&M" section content
   - Process steps

2. **Listings**: Edit `lib/mockData.ts`
   - Add/edit/remove listings
   - Update property details
   - Change photos (place images in `public/images/listings/`)

3. **Images**: Replace files in `public/images/`
   - `hero-background.jpg` - Main hero image
   - `listings/` folder - Property photos

### Changing Design

1. **Colors**: Edit `tailwind.config.ts`
   - Primary colors are defined in the `colors` section

2. **Typography**: Edit `app/layout.tsx`
   - Change font imports from Google Fonts

3. **Spacing & Sizing**: Edit `tailwind.config.ts`
   - Adjust spacing scale, max widths, etc.

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
