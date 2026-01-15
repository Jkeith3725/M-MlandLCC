# Property Images Guide

This folder contains images for all your property listings.

## Folder Structure

Each property gets its own folder named **exactly like the property slug** from `data/listings.json`:

```
/public/images/listings/
  ├── 19-acres-washington-county-oh/
  │   ├── thumbnail.jpg      ← Main photo
  │   ├── 1.jpg              ← Additional photo #1
  │   ├── 2.jpg              ← Additional photo #2
  │   └── 3.jpg              ← Additional photo #3
  │
  └── 45-acres-hocking-county-oh/
      ├── thumbnail.jpg
      └── 1.jpg
```

## Adding Images

1. **Check your property's slug** in `data/listings.json`
2. **Create a folder** with that exact slug name
3. **Add images:**
   - `thumbnail.jpg` - Main photo (required)
   - `1.jpg`, `2.jpg`, `3.jpg`, etc. - Additional photos (optional)

## File Naming Rules

- ✅ Use lowercase: `thumbnail.jpg`
- ✅ Use numbers in order: `1.jpg`, `2.jpg`, `3.jpg`
- ✅ Supported formats: `.jpg`, `.jpeg`, `.png`
- ❌ Don't skip numbers
- ❌ Don't use custom names like `front-view.jpg`

## Tips

- Resize images to ~1920px wide for faster loading
- Compress with TinyPNG.com before uploading
- The slug connects images to listings automatically
