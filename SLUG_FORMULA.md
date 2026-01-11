# Slug Auto-Generation Formula for Google Sheets

## The Problem

Your slugs weren't generating correctly because the formula was missing the word "county" in the middle.

## Correct Slug Format

Your slugs should follow this pattern: `{acreage}-acres-{county}-county-{state}`

### Examples:
- `19-acres-washington-county-oh`
- `45-acres-hocking-county-oh`
- `200-acres-washington-county-oh`
- `22-acres-wayne-county-wv`

## The Formula

**Put this formula in Cell R2** (Slug column, Row 2):

```
=IF(OR(F2="",C2="",D2=""),"",LOWER(REGEXREPLACE(REGEXREPLACE(REGEXREPLACE(ROUNDDOWN(F2,0)&"-acres-"&TRIM(C2)&"-county-"&LOWER(D2),"[^a-zA-Z0-9]+","-"), "-{2,}", "-"), "^-+|-+$", "")))
```

### What This Formula Does:

1. **Checks if required fields are filled:** `IF(OR(F2="",C2="",D2=""),"",...)`
   - If Acreage (F), County (C), or State (D) is empty, returns blank

2. **Builds the slug:** `ROUNDDOWN(F2,0)&"-acres-"&TRIM(C2)&"-county-"&LOWER(D2)`
   - Takes acreage (rounded down to whole number)
   - Adds "-acres-"
   - Adds the county name (trimmed of extra spaces)
   - Adds "-county-"
   - Adds the state (lowercase)
   - Example: `19` + `-acres-` + `Washington` + `-county-` + `oh` = `19-acres-Washington-county-oh`

3. **Cleans up special characters:** `REGEXREPLACE(...,"[^a-zA-Z0-9]+","-")`
   - Replaces any non-alphanumeric characters with hyphens
   - Example: `19-acres-Washington-county-oh` becomes `19-acres-Washington-county-oh`

4. **Converts to lowercase and removes extra hyphens:** `LOWER(...)`
   - Makes everything lowercase: `19-acres-washington-county-oh`
   - Removes double hyphens: `--` becomes `-`
   - Removes leading/trailing hyphens

## How to Use:

1. **Open your Google Sheet**
2. **Click on Cell R2** (Slug column, first data row)
3. **Paste the formula above**
4. **Press Enter**
5. **Drag the formula down** to all other rows (click the small blue square at the bottom-right of R2 and drag down)

## Result:

Every time you enter or change:
- Acreage (Column F)
- County (Column C)
- State (Column D)

The slug will automatically update!

### Example:

If you enter:
- **Acreage:** 19
- **County:** Washington
- **State:** OH

The slug will automatically become: **`19-acres-washington-county-oh`**

---

## Troubleshooting:

### "Page Not Found" Error

If you're getting "Page Not Found" when clicking a property, it means the slug in your Google Sheet doesn't match what the website expects.

**Check:**
1. Is the slug in Column R filled in?
2. Does it match the format `{acreage}-acres-{county}-county-{state}`?
3. Is it all lowercase?
4. Have you updated the website after changing the slug? (Run GitHub Actions workflow)

### Slug Isn't Generating

If the formula doesn't work:
1. Make sure Acreage, County, and State columns are filled in
2. Check that you pasted the formula in R2, not as plain text
3. Make sure the formula starts with `=` (equals sign)

---

## After Fixing Slugs:

1. **Verify all slugs look correct** in Column R
2. **Go to GitHub**: https://github.com/Jkeith3725/M-MlandLCC/actions
3. **Click on "Deploy to GitHub Pages"** workflow
4. **Click "Run workflow"** button (top right)
5. **Wait 2-3 minutes** for deployment to complete
6. **Test your website** - properties should now work!
