# Roluxa — Complete Setup Guide

Your full luxury home management website, now in **4 languages** (English, Arabic, French, Spanish), ready to deploy free on Cloudflare Pages with your names.co.uk domain.

> 💡 You only need to follow this once. After that, updates take 30 seconds.

---

## What's in this folder

```
Dean Website/
├── index.html              ← English (default)
├── ar/index.html           ← Arabic (RTL)
├── fr/index.html           ← French
├── es/index.html           ← Spanish
├── styles.css              ← All styling
├── script.js               ← Mobile menu, animations, contact form
├── logo.png                ← Your real logo ✓
├── logo.svg                ← Fallback logo (auto-used if PNG missing)
├── favicon.svg             ← Browser tab icon
├── sitemap.xml             ← Tells Google about all 4 language pages
├── robots.txt              ← Search engine permissions
├── site.webmanifest        ← Mobile install config
├── _headers                ← Cloudflare cache + security
├── _redirects              ← Cloudflare URL rules
└── README.md               ← This file
```

---

# PART A — Connect the Contact Form (5 minutes)

The contact form is on every language page. We'll connect all 4 forms to the same email inbox using **Formspree** — it's free for up to 50 enquiries/month and takes 5 minutes to set up.

## Step 1 — Create a Formspree account
1. Go to **https://formspree.io**
2. Click **Get Started Free** (top right)
3. Sign up with `modula3@hotmail.com` (the address where you want enquiries to land)
4. **Confirm your email** by clicking the link Formspree sends you. *(This step is required — without it, your form will not deliver.)*

## Step 2 — Create your form
1. Once logged in, click the **+ New Form** button
2. Form name: **`Roluxa Website`**
3. Send to email: **`modula3@hotmail.com`**
4. Click **Create Form**
5. Formspree will show you a **form endpoint** — it looks like this:
   ```
   https://formspree.io/f/xpzgkqyw
   ```
   (the last 8 characters are your unique ID — yours will be different)
6. **Copy this entire URL.**

## Step 3 — Paste the URL into all 4 language files

You need to replace the placeholder `https://formspree.io/f/YOUR_FORMSPREE_ID` in 4 files:

- `index.html`
- `ar/index.html`
- `fr/index.html`
- `es/index.html`

### Easy way (using TextEdit / Notepad):
For each of the 4 files:
1. Open the file in TextEdit (Mac) or Notepad (Windows)
2. Press **Cmd+F** (Mac) or **Ctrl+F** (Windows) to find
3. Search for: `YOUR_FORMSPREE_ID`
4. Replace it with the 8 characters from your Formspree URL (e.g., `xpzgkqyw`)
5. Save the file

### Even easier — ask me to do it
Reply with **"My Formspree ID is: xxxxxxxx"** and I'll update all 4 files for you in seconds.

## Step 4 — Test it
After deploying (Part B below), submit a test message from each language page. The first message arrives with a confirmation link — click it to verify, and all future messages will land directly in `modula3@hotmail.com`.

---

# PART B — Deploy to Cloudflare Pages (15 minutes)

## Step 1 — Sign up for Cloudflare (free)
1. Go to **https://dash.cloudflare.com/sign-up**
2. Sign up with `modula3@hotmail.com` (same email is fine — no conflict)
3. Verify your email when Cloudflare sends the link

## Step 2 — Create the Pages project
1. In the Cloudflare dashboard, look at the left-hand menu
2. Click **Workers & Pages**
3. Click the orange **Create application** button at the top
4. Click the **Pages** tab (not Workers)
5. Click **Upload assets**
6. Project name: type `roluxa` (or any name you like — this becomes part of the temporary URL)
7. Click **Create project**

## Step 3 — Upload your website files
1. Cloudflare now shows a big drag-and-drop area
2. Open Finder (Mac) or File Explorer (Windows)
3. Navigate to the **Dean Website** folder
4. **Select ALL files inside it** (Cmd+A on Mac, Ctrl+A on Windows) — including the `ar`, `fr`, `es` subfolders
5. Drag everything into the Cloudflare upload area
6. Wait until it says "Files uploaded" (about 10 seconds)
7. Click **Deploy site**

> ⚠️ **Important**: Drag the *contents* of the folder, not the folder itself. Cloudflare needs `index.html` at the top level.

## Step 4 — Verify it's live
After 30–60 seconds, Cloudflare gives you a temporary URL like:
```
https://roluxa.pages.dev
```
Click it. You should see your full site. Try:
- `https://roluxa.pages.dev/` → English
- `https://roluxa.pages.dev/ar/` → Arabic
- `https://roluxa.pages.dev/fr/` → French
- `https://roluxa.pages.dev/es/` → Spanish

If anything looks wrong, repeat Step 3 (re-upload).

## Step 5 — Connect your names.co.uk domain
This is where your `roluxa.co.uk` (or whatever your domain is) becomes the public URL.

### A — In Cloudflare:
1. Inside your Pages project, click the **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter your full domain name (e.g., `www.roluxa.co.uk`)
4. Click **Continue**
5. Cloudflare will show you a DNS record like:
   ```
   Type: CNAME
   Name: www
   Target: roluxa.pages.dev
   ```
   **Keep this tab open — you'll need these values in a moment.**
6. Repeat for the apex domain `roluxa.co.uk` (without `www`). Cloudflare will offer a CNAME-flattening record for the root.

### B — In names.co.uk:
1. Open a **new browser tab**
2. Log in at **https://www.names.co.uk**
3. Go to **My Account → Domain Names**
4. Click your domain (e.g., `roluxa.co.uk`)
5. Find **Manage DNS** or **DNS Management**
6. **Delete any existing A or CNAME records** for `www` and `@` (root) — they're pointing somewhere else
7. **Add the records Cloudflare gave you**:
   - Record 1: Type `CNAME`, Host `www`, Value `roluxa.pages.dev`, TTL 3600
   - Record 2: Type `CNAME`, Host `@` (or leave blank for root), Value `roluxa.pages.dev`, TTL 3600
   - *(If names.co.uk doesn't allow CNAME on the root, use the A record value Cloudflare provides instead)*
8. **Save**

### C — Wait for DNS to update
- Usually takes 5–30 minutes
- Sometimes up to 24 hours (rare)
- Cloudflare will email you when it's verified

### D — Confirm
- Visit `https://www.roluxa.co.uk` → site loads
- Cloudflare automatically issues a **free SSL certificate** so you get the padlock 🔒

---

# PART C — Boost SEO Across Different Countries

Now that the site has 4 languages and is on Cloudflare's global CDN, here's how to actually get visitors from those countries.

## Action 1 — Submit to Google (essential)
1. Go to **https://search.google.com/search-console**
2. Add property → enter `https://www.roluxa.co.uk`
3. Verify (use the **Domain → DNS TXT record** method — Cloudflare makes this easy)
4. Once verified, go to **Sitemaps** in the left menu
5. Submit: `https://www.roluxa.co.uk/sitemap.xml`
6. Google will now index all 4 language versions over the next few days

## Action 2 — Submit to Bing (powers Yahoo & DuckDuckGo)
1. **https://www.bing.com/webmasters**
2. Add your site → submit the same sitemap

## Action 3 — Google Business Profile (huge for local SEO)
1. **https://www.google.com/business**
2. Create profile: **Roluxa, Milton Keynes**
3. Add phone, hours (24/7), service categories, photos, your website URL
4. Verify by postcard or phone (takes 1–7 days)
5. **This is the single biggest local search win.**

## Action 4 — Country-specific tactics
| Country / Region | Best action |
|---|---|
| 🇬🇧 UK | Google Business Profile + Yell.com listing + 3+ Google reviews |
| 🇸🇦 Saudi / 🇦🇪 UAE | Ask Arabic-speaking clients to leave Google reviews in Arabic. Add WhatsApp Business with Arabic auto-reply. |
| 🇫🇷 France / 🇧🇪 Belgium | Submit to Pages Jaunes (yellow pages). Use French-language Facebook ads targeting expats. |
| 🇪🇸 Spain / 🇲🇽 Mexico / 🇦🇷 LATAM | Submit to Páginas Amarillas. Spanish reviews on Google. |

## Action 5 — Social proof
- Make sure your **Facebook** and **Instagram** profiles link back to `https://www.roluxa.co.uk`
- Pin a post on each saying "Now serving clients in 4 languages 🇬🇧 🇸🇦 🇫🇷 🇪🇸"
- Ask 3–5 happy clients to leave Google reviews — this alone moves you up rankings dramatically

## Action 6 — Free directory listings
List Roluxa on: **Yell.com**, **TrustPilot**, **Houzz**, **Bark.com**, **Yelp UK**, **Apple Maps Connect**.

---

# PART D — Updating the Site Later

Whenever you change any file:

**Option 1 — Drag & drop again (simplest):**
1. Cloudflare → Workers & Pages → Roluxa project
2. Click **Create deployment** (top right)
3. Drag the updated folder in → done in 30 seconds

**Option 2 — GitHub auto-deploy (advanced):**
- Push the folder to a GitHub repo
- Connect Cloudflare Pages to that repo
- Every git push auto-deploys. Zero clicks.

---

# Common Edits

| Want to change… | Where |
|---|---|
| Phone number | Search & replace `+44 7980 296602` in all 4 HTML files |
| Email | Search & replace `modula3@hotmail.com` |
| Add a service | Copy any `<article class="service-card">` block in `index.html` (and translations) |
| Colours | Edit `--gold`, `--bg` variables at top of `styles.css` |
| Add another language | Tell me — I'll add it |

---

# Troubleshooting

**Form says "Form not yet connected"** → You haven't replaced `YOUR_FORMSPREE_ID` yet. See Part A Step 3.

**Domain shows "DNS error" for hours** → Names.co.uk DNS sometimes takes 24h. Keep Cloudflare's verification tab open and refresh; it'll go green when ready.

**Arabic page text overlaps** → Hard refresh (Cmd+Shift+R / Ctrl+Shift+R) to clear cached CSS.

**WhatsApp button missing on iPhone** → It's there — scroll to wake it up. iOS Safari sometimes hides position-fixed elements briefly.

---

**Built**: May 2026 · **Languages**: EN / AR / FR / ES · **Hosting**: Cloudflare Pages · **Domain**: names.co.uk · **Form**: Formspree
