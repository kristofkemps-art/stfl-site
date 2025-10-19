# STFL + MailerLite (Secure, Vercel)

Keeps your MailerLite API key **off the client**. The page calls a Vercel function that forwards the request securely.

## Deploy (Vercel)

1) Create a new Vercel project and import this folder.
2) In **Vercel → Settings → Environment Variables**, set:
   - `MAILERLITE_API_KEY` = (your MailerLite API key)
3) Deploy.

## How it works
- Frontend (`index.html`) POSTs to `/api/ml-subscribe` with:
  {"email": "user@site.com", "groupId": "168721174766814526"}
- Serverless function (`api/ml-subscribe.js`) uses your secret `MAILERLITE_API_KEY` to call MailerLite’s `POST /api/subscribers` and attach the user to **group 168721174766814526**.
- In MailerLite, create an **Automation**: *When subscriber joins group* → send your welcome email.

## Local dev (optional)
- Install `vercel` CLI (`npm i -g vercel`).
- Run `vercel dev` in this folder; add `MAILERLITE_API_KEY` to your shell/session.

## Notes
- Your API key never appears in client code.
- If you need custom fields (e.g., name), add them to the POST body and forward them in `api/ml-subscribe.js`.
