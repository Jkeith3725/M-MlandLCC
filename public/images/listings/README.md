# Property Images Guide

This folder contains images for all your property listings. Each property has its own subfolder.

## 📁 Folder Structure

Each property gets its own folder named **exactly like the property slug**:

```
/public/images/listings/
  ├── 19-acres-washington-county-oh/     ← Property folder (matches slug!)
  │   ├── thumbnail.jpg                   ← Main property photo
  │   ├── 1.jpg                          ← Additional photo #1
  │   ├── 2.jpg                          ← Additional photo #2
  │   └── 3.jpg                          ← Additional photo #3
  │
  ├── 45-acres-hocking-county-oh/        ← Another property
  │   ├── thumbnail.jpg
  │   ├── 1.jpg
  │   └── 2.jpg
  │
  └── 22-acres-wayne-county-wv/          ← Another property
      ├── thumbnail.jpg
      └── 1.jpg
```

---

## 🎯 How It Works

### Step 1: Check Your Property Slug

1. Open your Google Sheet
2. Find your property in the list
3. Look at Column R (Slug column)
4. **Copy the exact slug** (example: `19-acres-washington-county-oh`)

### Step 2: Create a Folder

The folder name **MUST exactly match the slug** from your Google Sheet!

**Example:**
- ✅ Correct: `19-acres-washington-county-oh`
- ❌ Wrong: `19 Acres Washington County OH`
- ❌ Wrong: `19-acres-washington-oh` (missing "county")
- ❌ Wrong: `19-Acres-Washington-County-OH` (wrong capitalization)

### Step 3: Add Images to the Folder

#### Required File:
- **`thumbnail.jpg`** - The main property photo (shows in listings grid)

#### Optional Files (for additional photos):
- **`1.jpg`** - First additional photo
- **`2.jpg`** - Second additional photo
- **`3.jpg`** - Third additional photo
- **`4.jpg`** - Fourth additional photo
- ... up to `10.jpg`

**File Naming Rules:**
- ✅ Use lowercase: `thumbnail.jpg` (not `Thumbnail.jpg` or `THUMBNAIL.JPG`)
- ✅ Use numbers in order: `1.jpg`, `2.jpg`, `3.jpg`
- ✅ Supported formats: `.jpg`, `.jpeg`, `.png`
- ❌ Don't skip numbers (don't go from `1.jpg` to `3.jpg`)
- ❌ Don't use custom names like `front-view.jpg` or `aerial-shot.jpg`

---

## 📸 Complete Workflow: Adding a New Property with Images

### Step-by-Step Guide:

#### 1. **Add Property to Google Sheet**
- Open your Google Sheet
- Add a new row with all property information
- The slug will auto-generate (Column R)
- **Leave Columns I and J empty** (Thumbnail Image and Additional Photos)

#### 2. **Prepare Your Images**
- Gather your property photos on your computer
- Rename them:
  - Best photo → `thumbnail.jpg`
  - Other photos → `1.jpg`, `2.jpg`, `3.jpg`, etc.

#### 3. **Upload to GitHub**

**Option A: Via GitHub Website (Easy)**

1. Go to: https://github.com/Jkeith3725/M-MlandLCC
2. Click on: `public` → `images` → `listings`
3. Click **"Add file"** → **"Upload files"**
4. **Drag your first image** (thumbnail.jpg) to the upload area
5. **In the filename box**, type: `19-acres-washington-county-oh/thumbnail.jpg`
   - This creates the folder automatically!
6. Click **"Commit changes"**
7. Repeat for additional images:
   - Upload `1.jpg` to `19-acres-washington-county-oh/1.jpg`
   - Upload `2.jpg` to `19-acres-washington-county-oh/2.jpg`
   - etc.

**Option B: Via Desktop (For Bulk Uploads)**

If you have GitHub Desktop or Git installed:
1. Clone the repository to your computer
2. Navigate to `/public/images/listings/`
3. Create a new folder with the slug name
4. Copy all your images into that folder
5. Commit and push to GitHub

#### 4. **Rebuild Your Website**
1. Go to: https://github.com/Jkeith3725/M-MlandLCC/actions
2. Click: **"Deploy to GitHub Pages"**
3. Click: **"Run workflow"** (green button)
4. Wait 2-3 minutes for deployment
5. **Done!** Your property with images will appear on the website

---

## 🔄 Automatic vs Manual Image URLs

The system is smart and supports **two modes**:

### Mode 1: Auto-Detect (Recommended - Easier!)
- **Leave Columns I and J empty** in your Google Sheet
- Just upload images to the folder
- Website automatically finds: `thumbnail.jpg`, `1.jpg`, `2.jpg`, etc.
- **No need to update Google Sheet for images!**

### Mode 2: Manual (Advanced - More Control)
- **Fill in Columns I and J** in your Google Sheet
- Column I: `/images/listings/19-acres-washington-county-oh/thumbnail.jpg`
- Column J: `/images/listings/19-acres-washington-county-oh/1.jpg,/images/listings/19-acres-washington-county-oh/2.jpg`
- Use this if you want specific images or custom URLs (like Imgur)

**You can mix both modes!** Some properties can use auto-detect, others can use manual URLs.

---

## 📝 Example

Let's say you're adding a new property:

**Google Sheet Data:**
- Row 13: `20 Acres - Athens County Farmland`
- Slug (auto-generated): `20-acres-athens-county-oh`
- Columns I and J: **Leave empty**

**Folder Structure:**
```
/public/images/listings/20-acres-athens-county-oh/
  ├── thumbnail.jpg  ← Your best property photo
  ├── 1.jpg          ← Photo of the field
  ├── 2.jpg          ← Photo of the barn
  └── 3.jpg          ← Aerial view
```

**Result:**
- Thumbnail shows in listings grid
- All 3 additional photos show in property gallery
- No need to update Google Sheet!

---

## ❓ Troubleshooting

### Images Not Showing Up?

**Check these things:**

1. **Is the folder name EXACTLY the same as the slug?**
   - Go to your Google Sheet, Column R
   - Copy the slug EXACTLY
   - Check if folder name matches (case-sensitive!)

2. **Is the file named correctly?**
   - Must be lowercase: `thumbnail.jpg` not `Thumbnail.jpg`
   - Must be numbered: `1.jpg`, `2.jpg`, `3.jpg`

3. **Did you rebuild the website?**
   - Changes don't appear instantly
   - Go to GitHub Actions and click "Run workflow"
   - Wait 2-3 minutes for deployment

4. **Are the images in the right format?**
   - Supported: `.jpg`, `.jpeg`, `.png`
   - Not supported: `.gif`, `.webp`, `.heic`

### "Folder doesn't exist" error on GitHub?

- You can't create empty folders in GitHub
- You must upload at least one file to create the folder
- Use the upload method described above

---

## 💡 Pro Tips

1. **Optimize your images before uploading:**
   - Resize to reasonable dimensions (1920px wide is good)
   - Compress to reduce file size (use tools like TinyPNG.com)
   - This makes your website load faster!

2. **Use consistent image quality:**
   - All images should be similar quality/resolution
   - Looks more professional

3. **Name your files on your computer first:**
   - Before uploading, rename them to `thumbnail.jpg`, `1.jpg`, etc.
   - Easier than renaming during upload

4. **Keep a backup:**
   - Keep original photos on your computer
   - GitHub is not a backup system

---

## 🆘 Need Help?

If you're stuck:
1. Check that your slug in Column R is filled in
2. Make sure folder name exactly matches slug
3. Verify file names are lowercase
4. Rebuild the website via GitHub Actions

The slug is the key that connects everything!
