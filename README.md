# 🌊 Drift — Messages in the Void

A mesmerizing digital ocean where anonymous messages float like bioluminescent creatures in the deep sea. Drop a thought into the abyss, watch it drift among others.

![Drift Preview](https://via.placeholder.com/800x400/0a0f1a/22d3ee?text=Drift)

## ✨ Features

- **Anonymous Messages**: Share thoughts without identity
- **Bioluminescent UI**: Messages glow in cyan, teal, purple, pink, and blue
- **Depth Parallax**: Messages exist at different depths, creating visual dimension
- **Floating Animation**: Everything gently drifts in the current
- **Ambient Particles**: Plankton-like particles add atmosphere
- **Real-time Updates**: New messages surface every 30 seconds

## 🚀 Quick Deploy to Vercel + Neon

### 1. Create a Neon Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (looks like `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

### 2. Set Up the Database Table

Run this SQL in your Neon dashboard SQL Editor:

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'cyan',
  depth INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### 3. Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add the environment variable:
   - `DATABASE_URL` = your Neon connection string
4. Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your Neon DATABASE_URL
echo "DATABASE_URL=your_neon_connection_string" > .env.local

# Push the database schema
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the void.

## 🎨 Tech Stack

- **Next.js 14** — App Router, Server Components
- **Neon PostgreSQL** — Serverless Postgres
- **Drizzle ORM** — Type-safe database queries
- **Framer Motion** — Buttery smooth animations
- **Tailwind CSS** — Utility-first styling

## 🌌 The Aesthetic

Drift draws inspiration from:
- Deep sea bioluminescence
- The loneliness and connection of space
- Message-in-a-bottle romanticism
- Terminal/hacker aesthetics

Colors are carefully chosen to create a sense of wonder:
- **Cyan** (#22d3ee) — The primary glow
- **Teal** (#2dd4bf) — Organic, alive
- **Purple** (#a78bfa) — Mystery, depth
- **Pink** (#f472b6) — Warmth in the cold
- **Blue** (#60a5fa) — Trust, calm

---

Made with 💙 and stardust

