# AI Career Coach

An AI-powered career workspace: build a resume, generate tailored cover letters, practice interviews with AI-generated quizzes, and get personalized industry insights — all from one profile.

**Try it live:** *(add your Vercel URL here after deploying)*
**Demo login:** `demo@example.com` / `Demo@1234` — or just click **"Try demo account"** on the login page. No signup needed, no email verification, pre-populated with a sample resume and cover letter so there's something to look at immediately.

---

## Features

- **Onboarding** — one-time profile setup (industry, sub-industry, experience, skills, bio) that every other feature reads from
- **Industry Insights dashboard** — AI-generated salary ranges, demand level, market outlook, growth rate, top skills, and trends for the user's industry, charted with Recharts. Cached per-industry and shared across users in the same industry, not regenerated per user
- **Resume Builder** — structured form (contact, summary, categorized skills, experience, projects, education, certifications) with a live preview, Markdown export, and a one-page ATS-friendly PDF (three selectable templates) with real clickable links
- **AI Cover Letter Generator** — takes a job title, company, and job description, and produces a tailored letter using the user's actual skills (prioritizing whichever ones the job description mentions)
- **Mock Interview** — AI-generated multiple-choice technical quiz scoped to the user's industry and skills, scored on submission, with an AI-written improvement tip pinpointing the specific knowledge gap behind any wrong answers
- **Auth** — email/password with OTP verification for registration, login, and password reset

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router + a few legacy Pages Router API routes) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Radix primitives) |
| Database | PostgreSQL via Prisma ORM ([Neon](https://neon.tech) in production) |
| AI | Google Gemini → Groq → OpenAI fallback chain (see diagram below) |
| Auth | JWT in an httpOnly cookie, bcrypt password hashing |
| Email | Nodemailer via Brevo SMTP (or console-logged in local dev) |
| PDF export | @react-pdf/renderer |
| E2E testing | Playwright |

---

## Architecture

```mermaid
graph TB
    Browser["Browser"]

    subgraph Vercel["Vercel — Next.js App Router"]
        MW["Middleware<br/>(route protection)"]
        Pages["Pages / Server Components"]
        Actions["Server Actions<br/>(actions/*.js)"]
        API["Legacy API Routes<br/>(pages/api/*)"]
    end

    subgraph Data["Data"]
        Neon[("Neon PostgreSQL")]
    end

    subgraph AI["AI provider chain"]
        Gemini["Google Gemini<br/>(primary)"]
        Groq["Groq<br/>(free fallback)"]
        OpenAI["OpenAI<br/>(optional fallback)"]
    end

    subgraph Services["Other services"]
        Brevo["Brevo SMTP<br/>(OTP emails)"]
    end

    Browser --> MW --> Pages
    Pages --> Actions
    Pages --> API
    Actions --> Neon
    API --> Neon
    API --> Brevo
    Actions --> Gemini
    Gemini -. on failure .-> Groq
    Groq -. on failure .-> OpenAI
```

## User journey

```mermaid
flowchart TD
    A["Land on '/'"] --> B["Register or click\n'Try demo account'"]
    B --> C{"Verified?"}
    C -->|New user| D["Email OTP"]
    D --> E["Login"]
    C -->|Demo account| E
    E --> F{"Onboarding\ncomplete?"}
    F -->|No| G["Onboarding:\nindustry, experience, skills"]
    G --> H["Dashboard"]
    F -->|Yes| H
    H --> I["Resume Builder"]
    H --> J["Cover Letter Generator"]
    H --> K["Mock Interview"]
    H --> L["Industry Insights"]
    I --> M["Download one-page PDF"]
```

## AI generation fallback chain

Every AI call (quiz generation, improvement tips, industry insights) goes through `lib/ai-generate.js`, which tries providers in order and only moves to the next one on a real failure — never as a race.

```mermaid
sequenceDiagram
    participant U as Server Action
    participant G as Gemini
    participant Q as Groq (free)
    participant O as OpenAI (optional)

    U->>G: generateContent(prompt)
    alt succeeds
        G-->>U: text
    else 503 / 429 / network error
        loop up to 3 retries, exponential backoff
            U->>G: retry
        end
        alt still failing
            U->>Q: chat.completions.create(prompt)
            alt Groq succeeds
                Q-->>U: text
            else Groq unavailable / not configured
                U->>O: chat.completions.create(prompt)
                O-->>U: text
            end
        end
    end
```

## Data model

```mermaid
erDiagram
    User ||--o| Resume : has
    User ||--o{ CoverLetter : has
    User ||--o{ Assessment : has
    User }o--o| IndustryInsight : "belongs to"

    User {
        string id PK
        string email UK
        string password
        boolean isAccountVerified
        string industry
        int experience
        string_array skills
        string bio
    }
    Resume {
        string id PK
        string userId FK
        string content "JSON resume data"
        float atsScore
    }
    CoverLetter {
        string id PK
        string userId FK
        string companyName
        string jobTitle
        string content
        string status
    }
    Assessment {
        string id PK
        string userId FK
        float quizScore
        json_array questions
        string improvementTip
    }
    IndustryInsight {
        string id PK
        string industry UK
        json_array salaryRanges
        float growthRate
        string demandLevel
        string_array topSkills
        string marketOutlook
    }
```

---

## Getting started (local development)

### Prerequisites
- Node.js 20+
- Docker Desktop (for local Postgres)

### 1. Clone and install
```bash
git clone https://github.com/prerna701/ai-career-coach.git
cd ai-career-coach
npm install
```

### 2. Start Postgres
```bash
docker compose up -d postgres
```

### 3. Configure environment
```bash
cp .env.example .env
```
Then fill in `.env` — see [Environment variables](#environment-variables) below. For local dev you can leave `EMAIL_BACKEND="console"` so OTPs print to the terminal instead of requiring real SMTP.

### 4. Apply the schema and seed data
```bash
npx prisma migrate deploy
npm run seed:demo   # optional: creates the demo@example.com account
```

### 5. Run it
```bash
npm run dev
```
Visit whatever URL Next.js prints (usually `http://localhost:3000`, but it'll pick another free port if that one's taken).

---

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `JWT_SECRET` | Yes | Any long random string (`openssl rand -hex 32`) |
| `GEMINI_API_KEY` | Yes | Free tier at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GROQ_API_KEY` | No | Free fallback if Gemini is overloaded — [console.groq.com/keys](https://console.groq.com/keys) |
| `OPENAI_API_KEY` | No | Second fallback, only if you have a paid OpenAI key |
| `EMAIL_BACKEND` | No | Set to `"console"` for local dev to log OTPs instead of sending them. **Never set this in production.** |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | Yes (unless `EMAIL_BACKEND=console`) | SMTP credentials — [Brevo](https://brevo.com) has a free tier (300 emails/day) |

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Run a production build |
| `npm run seed:demo` | Seed the public demo account (safe to run against production) |
| `npm run seed:e2e` | Seed a test account used by the E2E suite |
| `npm run test:e2e` | Run the Playwright E2E suite (`e2e/generation-flows.spec.js`) |

---

## Deploying

1. Push to GitHub, then import the repo on [Vercel](https://vercel.com/new)
2. Create a free Postgres database on [Neon](https://neon.tech) and run `npx prisma migrate deploy` against it once
3. Add the environment variables from the table above in Vercel's project settings
4. **Leave `EMAIL_BACKEND` unset** in Vercel — it exists only to disable email sending in local dev
5. Deploy. Run `npm run seed:demo` once against your production `DATABASE_URL` if you want the demo account live there too

### Known limitations
- **Profile picture upload** writes to the local filesystem (`public/uploads`), which doesn't persist on Vercel's serverless functions. Works fine in local dev / on a traditional server; needs Vercel Blob or S3 to work in production.

---

## Project structure

```
ai-career-coach/
├── app/
│   ├── (auth)/              # login, register, OTP verification, password reset
│   ├── (main)/              # onboarding, dashboard, resume, cover letter, interview
│   ├── layout.js            # root layout, forced dark theme
│   └── page.jsx             # landing page
├── actions/                 # server actions (data + AI generation)
├── components/
│   ├── landing/              # landing page sections
│   ├── ui/                   # shadcn/ui primitives
│   └── auth/                 # shared auth form fields
├── lib/
│   ├── ai-generate.js        # Gemini → Groq → OpenAI fallback chain
│   ├── ai-retry.js           # retry-with-backoff for transient AI failures
│   ├── auth.js / jwt.js      # session handling
│   └── mailer.js             # SMTP / console email backend
├── pages/api/                # legacy auth + user API routes
├── prisma/                   # schema + migrations
├── scripts/                  # seed-demo-user.cjs, seed-e2e-user.cjs
├── e2e/                      # Playwright tests
└── docker-compose.yml        # local Postgres (+ migrate/seed service)
```

---

## Testing

```bash
npm run test:e2e
```

Runs a real browser against the app (auth bypassed via a signed JWT, matching how the app itself issues sessions) and verifies the three core generation flows end to end: resume save, cover letter generation, and interview quiz generation — checking actual database state, not just UI text.
