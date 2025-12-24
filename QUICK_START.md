# M&M Land Company - Quick Start Guide

## Getting Started (3 Simple Steps)

### Step 1: Install Dependencies
```bash
cd /Users/justinkeith/Desktop/mm-land-company
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

---

## What You'll See

### Homepage (/)
- Hero section with company intro
- 6 featured property listings
- "Why Choose M&M" benefits section
- 4-step process overview
- Service area counties banner

### All Listings (/listings)
- Grid of all 12 property listings
- Filter controls:
  - County selection
  - Min/Max acreage
  - Min/Max price
  - Sort options (price, acreage, newest)
- Pagination (9 items per page)
- Mobile-friendly filter drawer

### Property Detail (/listings/[property-name])
- Large hero image
- Property description and features
- Photo gallery with lightbox
- Pricing information sidebar
- Contact buttons
- Related properties in same county

---

## Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Run production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
mm-land-company/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── listings/
│   │   ├── page.tsx       # All listings
│   │   └── [slug]/        # Individual listing
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── listings/         # Listing-specific components
│   ├── home/             # Homepage sections
│   ├── layout/           # Navbar & Footer
│   └── forms/            # Contact & Sell forms
├── lib/                  # Utilities & data
│   ├── api.ts           # Listing fetch functions
│   ├── mockData.ts      # 12 sample listings
│   ├── types.ts         # TypeScript types
│   ├── constants.ts     # App constants
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
└── public/images/       # SVG placeholder images
```

---

## Sample Data

The project includes **12 sample property listings**:

1. **Pine Ridge Forest** - 45.5 acres, Jackson County
2. **Creek Hollow Tract** - 23 acres, Clarke County
3. **Oak Meadow Estates** - 67.3 acres, Jasper County
4. **Sweetgum Ridge** - 15 acres, Newton County
5. **River Bend Plantation** - 120 acres, Jackson County
6. **Hickory Grove** - 34.8 acres, Clarke County
7. **Longleaf Legacy** - 89.5 acres, Jasper County
8. **Mossy Creek Farm** - 56 acres, Newton County
9. **Whispering Pines** - 28.3 acres, Jackson County
10. **Turkey Creek Timber** - 41 acres, Clarke County
11. **Deer Haven** - 19.7 acres, Jasper County
12. **Heritage Hills** - 73 acres, Newton County

---

## Key Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly controls

### Filtering System
- Filter by county
- Filter by acreage range
- Filter by price range
- Sort by multiple criteria

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

### Performance
- Server-side rendering
- Optimized images
- Loading skeletons
- Fast page transitions

---

## Customization

### Update Company Info
Edit `/components/layout/Footer.tsx` for contact details.

### Change Colors
Modify `/tailwind.config.ts` for custom color scheme.

### Add Real Listings
Replace `/lib/mockData.ts` with actual property data.

### Replace Images
Replace SVG files in `/public/images/` with real photos.

---

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **React Hooks** - State management
- **SVG Images** - Scalable placeholder graphics

---

## Support

For issues or questions about the codebase, refer to:
- `PROJECT_SETUP.md` - Detailed project documentation
- `README.md` - Project overview
- Next.js docs: https://nextjs.org/docs

---

**Status**: ✅ Ready to run!

Run `npm install && npm run dev` to get started.
