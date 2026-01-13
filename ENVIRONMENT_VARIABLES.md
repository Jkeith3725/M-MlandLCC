# Environment Variables Documentation

This document lists all environment variables required for the M&M Land Company website.

## Required Environment Variables

### Production (GitHub Actions)

These variables must be set as **GitHub Repository Secrets** at:
`Settings > Secrets and variables > Actions > New repository secret`

#### 1. `GOOGLE_SERVICE_ACCOUNT` (Optional but Recommended)

- **Purpose**: Service Account credentials for authenticating with Google Sheets API
- **Type**: JSON string (entire Service Account file content)
- **Required**: Optional (will fall back to public CSV if not provided)
- **Where to get it**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create or select a project
  3. Enable Google Sheets API
  4. Go to "IAM & Admin" > "Service Accounts"
  5. Create a new Service Account
  6. Generate a JSON key
  7. Share your Google Sheet with the Service Account email address
  8. Copy the entire JSON file content
  9. Paste it as the secret value in GitHub

**Example format** (DO NOT use actual credentials):
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Important Notes**:
- This is a server-side only variable (NOT prefixed with `NEXT_PUBLIC_`)
- Only accessed during build time
- Never exposed to client-side code
- If not set, the system falls back to public CSV export

#### 2. `SLACK_WEBHOOK_URL` (Optional)

- **Purpose**: Slack webhook URL for build notifications
- **Type**: String (URL)
- **Required**: Optional (only needed if you want Slack notifications)
- **Where to get it**:
  1. Go to your Slack workspace
  2. Create an Incoming Webhook at [api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
  3. Select a channel for notifications
  4. Copy the webhook URL
  5. Add it as a GitHub secret

**Example format**:
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX
```

**What it does**:
- Sends notification on build failure with error details
- Sends notification on successful deployment with site URL
- Includes repository, branch, commit SHA, and action run link

### Build-time Environment Variables

These are automatically set by Next.js or GitHub Actions:

#### `NEXT_PUBLIC_USE_GOOGLE_SHEETS`

- **Purpose**: Flag to enable Google Sheets data fetching
- **Type**: Boolean string ("true" or "false")
- **Set in**: `.github/workflows/deploy.yml`
- **Value**: `true`
- **Note**: This is a public variable (prefixed with `NEXT_PUBLIC_`) but only affects build behavior

## Local Development

### For Local Builds

If you want to test the build process locally with Service Account authentication:

1. Create a `.env.local` file in the project root (this file is gitignored)
2. Add your Service Account JSON:

```bash
GOOGLE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"..."}'
```

**Important**:
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Use single quotes around the JSON to avoid shell escaping issues

### For Local Development Server

For running the Next.js development server (`npm run dev`):
- No environment variables are required
- The app uses public CSV export as fallback
- Google Sheets data is only fetched at build time, not during development

## Verification

To verify your environment is configured correctly:

```bash
# Run the pre-build validation script
npm run validate
```

This will check:
1. ✅ Environment variables are set correctly
2. ✅ Can connect to Google Sheets
3. ✅ Data validates against schema

## Security Best Practices

### DO ✅

- Store secrets in GitHub Secrets (encrypted at rest)
- Use Service Account authentication (scoped permissions)
- Keep Service Account JSON private
- Rotate credentials if compromised
- Use least-privilege access for Service Accounts

### DON'T ❌

- Never commit `.env.local` to version control
- Never use `NEXT_PUBLIC_` prefix for secrets
- Never log environment variable values
- Never hardcode credentials in source code
- Never share Service Account JSON publicly

## Troubleshooting

### Build fails with "GOOGLE_SERVICE_ACCOUNT not set"

- This is just a warning, not an error
- The system will fall back to public CSV export
- If you want to use Service Account auth, add the secret in GitHub

### Build fails with "Failed to fetch Google Sheets data"

1. Check if GOOGLE_SERVICE_ACCOUNT is valid JSON
2. Verify the Service Account email has access to the Google Sheet
3. Check if Google Sheets API is enabled in your Google Cloud project
4. Verify the sheet is shared with the Service Account email

### Slack notifications not working

1. Verify SLACK_WEBHOOK_URL is set in GitHub Secrets
2. Test the webhook URL manually with curl
3. Check if the webhook is still active in Slack settings
4. Verify the workflow has the correct secret name

## Summary

**Minimum required for production**: None (system works with public CSV fallback)

**Recommended for production**:
- `GOOGLE_SERVICE_ACCOUNT` - For reliable API access
- `SLACK_WEBHOOK_URL` - For build monitoring

**Required for local testing**: None (optional: `GOOGLE_SERVICE_ACCOUNT` in `.env.local`)
