# Riya AI — installable PWA

A real chat app (not a scripted demo) with a Vite frontend, installable PWA shell, saved chat history on the device, and a server-side Gemini API route.

## What works
- Real AI replies through Google's Gemini API.
- Casual Hinglish-friendly Riya persona.
- Chat history stored in this browser on this device.
- Clear-chat control.
- Installable PWA on supported browsers.
- API key stays on the server (do not put it in frontend code).

## Free setup
The app code is free. AI usage depends on Google's current Gemini API free-tier eligibility, quotas, and model availability. Google may require an account, age eligibility, or billing/region checks. Do not assume unlimited free usage.

### 1. Get an API key
Create a Gemini API key in Google AI Studio: https://aistudio.google.com/app/apikey

Keep the key private. Do not send it to anyone or paste it into `src/main.js`.

### 2. Deploy on Vercel
1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository and upload the contents of this project (not the ZIP itself).
3. Sign in to https://vercel.com with GitHub and import that repository.
4. In Vercel, open **Project Settings → Environment Variables**.
5. Add `GEMINI_API_KEY` with your key as its value.
6. Optionally add `GEMINI_MODEL` with a model currently available to your API key. Default: `gemini-2.5-flash`.
7. Deploy. Vercel will run `npm run build` and serve the app plus `/api/chat`.

The included `vercel.json` configures the static build and serverless function.

### 3. Install on Android
1. Open your deployed HTTPS site in Chrome on Android.
2. Open Chrome's three-dot menu.
3. Tap **Install app** or **Add to Home screen** (wording varies).
4. Open Riya AI from the new home-screen icon.

### 4. Local preview (UI only unless API is deployed)
Requires Node.js 20+.
```bash
npm install
npm run dev
```
The Vercel `/api` function does not run under plain Vite dev server. Deploy to Vercel to test live AI chat, or use Vercel CLI (`npx vercel dev`) after setting `GEMINI_API_KEY` in your local environment.

## Privacy and limitations
- Chat history is stored in localStorage in this browser. Clearing browser site data removes it.
- Messages are sent to Google's Gemini API through your deployed Vercel function when you chat.
- The service provider may process prompts under its own terms and privacy policy.
- Do not enter passwords, financial details, or sensitive personal information.
- The app identifies Riya as an AI, not a real person.
- This is a starter project. Add authentication and rate limiting before sharing it publicly; otherwise anyone who finds the URL may use your API quota.
- PWA pages can open offline, but AI replies require an internet connection.
