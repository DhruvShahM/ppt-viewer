# Social Media Integration Setup

This guide explains how to set up the social media integrations for the dashboard.

## Prerequisites

1.  **Node.js**: Ensure Node.js is installed.
2.  **Packages**: Run `npm install` to install required dependencies (`graphql`, `@apollo/server`, etc.).

## Configuration

Social media credentials are managed via environment variables or the `server/config/social.js` file.
Create a `.env` file in the root directory with the following keys:

```env
# LinkedIn
LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret

# Google / YouTube
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Facebook / Instagram
FACEBOOK_APP_ID=your_id
FACEBOOK_APP_SECRET=your_secret

# Reddit
REDDIT_CLIENT_ID=your_id
REDDIT_CLIENT_SECRET=your_secret

# Security
SOCIAL_SECRET_KEY=complex_random_string_for_encryption_at_least_32_chars
```

## How to Get Keys

### Instagram / Facebook
1.  Go to [Meta for Developers](https://developers.facebook.com/).
2.  Create an App (Business type).
3.  Add "Instagram Basic Display" and "Facbeook Login" products.
4.  Add test users or set to Live.
5.  Use `http://localhost:3001/api/auth/facebook/callback` as Valid OAuth Redirect URI.

### YouTube (Google)
1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a Project.
3.  Enable "YouTube Data API v3".
4.  Create OAuth 2.0 Credentials.
5.  Add `http://localhost:3001/api/auth/google/callback` as Redirect URI.

### LinkedIn
1.  Go to [LinkedIn Developers](https://www.linkedin.com/developers/).
2.  Create an App.
3.  Request access to "Sign In with LinkedIn" and "Share on LinkedIn".
4.  Add `http://localhost:3001/api/auth/linkedin/callback` as Authorized Redirect URL.

### Reddit
1.  Go to [Reddit Preferences/Apps](https://www.reddit.com/prefs/apps).
2.  Create a generic "web app".
3.  Set redirect uri to `http://localhost:3001/api/auth/reddit/callback`.

## Usage

1.  Start the server: `npm run server` (or `node server/index.js`).
2.  Start the frontend: `npm run dev`.
3.  Navigate to the "Social Ecosystem" view via the button in the Deck Selector.
4.  Click "Connect" on any platform card.
5.  Authorize the app in the popup.
6.  The dashboard will update with your connection status and (mocked) feed data.

## Architecture

-   **Backend**: Node.js + Express + Apollo GraphQL Server.
-   **API Endpoint**: `/graphql` for fetching dashboard data.
-   **Auth Routes**: `/api/auth/:platform` for handling OAuth redirects.
-   **Data Storage**: `social_tokens.json` (encrypted locally).
