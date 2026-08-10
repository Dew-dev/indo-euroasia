# Indonesia Euroasia Pavilion

Commercial B2B cooperation platform website for **Indo-Euroasia.com** — connecting Eurasian companies with Indonesian partners.

Built with **Vue 3** (Composition API), **Vite**, **Tailwind CSS**, **vue-i18n**, and an **Express.js** contact API with Nodemailer.

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | Vue 3 + Vite + Tailwind CSS v4 + vue-i18n (EN / ID / RU) |
| Backend | Express.js + cors + nodemailer |

## Project structure

```
indo-euroasia/
├── backend/
│   ├── server.js          # Express API + Nodemailer
│   ├── .env.example       # SMTP configuration template
│   └── package.json
├── public/
├── src/
│   ├── components/        # Navbar, Hero, About, Property, Services, Commodities, Contact, Footer
│   ├── i18n/              # vue-i18n setup + locales
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting started

### 1. Frontend

```bash
npm install
npm run dev
```

Vite runs at `http://localhost:5173` and proxies `/api` to the backend.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

API runs at `http://localhost:3001`.

### 3. SMTP (production email)

Edit `backend/.env`:

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_FROM="Indonesia Euroasia Pavilion <noreply@indo-euroasia.com>"
```

Contact form submissions are always delivered to **info@indo-euroasia.com**.

If SMTP is not configured, the API still accepts submissions and logs them to the console (useful for local development).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite frontend |
| `npm run build` | Production build |
| `npm run backend` | Start Express API |
| `npm run backend:dev` | Start Express API with nodemon |

## Sections

1. Header / Navbar — logo, nav links, language switcher (EN/ID/RU), CTA
2. Hero
3. About Us — vision, mission, EGI endorsement
4. EGI Property Business — Hadith Hotel, Hotel Kampoeng Indonesia, Graha Nusantara
5. Our Services — 6 core service offerings
6. Priority Trade Portfolio — Indonesia ↔ Eurasia commodities
7. Contact Us — form posts to `POST /api/contact`
8. Footer

## API

### `POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "subject": "Partnership inquiry",
  "message": "We would like to explore cooperation..."
}
```

Success response:

```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```
