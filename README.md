# 2ez

A personal **link-in-bio** profile page built with [Next.js](https://nextjs.org) (App Router), React 19, and Tailwind CSS v4.

It shows live Discord presence (status, activities, currently-playing Spotify) pulled from [Lanyard](https://github.com/Phineas/lanyard), a profile view counter backed by Upstash Redis, and a floating background music player.

## Features

- 🔴 Live Discord status badge (online / idle / dnd / offline) — updates in real time via Lanyard WebSocket
- 🎮 "Now playing" card for games/apps with elapsed timer and artwork
- 🎵 Spotify now-playing widget with album art and animated progress bar
- 👤 Name, username, and avatar fetched live from Discord via Lanyard (falls back to `config.tsx` if unreachable)
- 👁 Profile view counter (Upstash Redis, one count per session)
- 🎧 Looping background music with volume slider and fade-in
- 🔗 Social links grid with custom brand icons
- 🖼 Animated entry overlay, custom cursor, right-click / DevTools protection

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **Tailwind CSS v4**
- **Lanyard** — live Discord presence (REST + WebSocket)
- **Upstash Redis** — view counter storage
- **Vercel Analytics** — page analytics
- **Vercel** — hosting

## Getting Started (Cloning)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/2ez.git
cd 2ez
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable                   | Description                       |
| -------------------------- | --------------------------------- |
| `UPSTASH_REDIS_REST_URL`   | Your Upstash Redis REST URL       |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash Redis REST API token |

Create a free database at [Upstash](https://upstash.com) → create a Redis database → copy the REST URL and token. This powers the view counter; the app still runs without it, but view counts won't persist.

### 4. Set your Discord ID (for Lanyard)

Open `config.tsx` and set your Discord user ID:

```ts
discordId: "YOUR_DISCORD_ID",
```

To make your presence publicly readable, [join the Lanyard Discord server](https://discord.gg/UrXF2cfJ7F) and confirm you're listed — then `https://api.lanyard.rest/v1/users/<YOUR_ID>` will return your presence.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your profile.

### 6. Add your own music (optional)

Place an MP3 in `public/` and point the API to it in `app/api/music/route.ts`.

## Configuration

Everything is centralized in `config.tsx`:

- `discordId` / `discordName` / `name` / `avatar` / `status` — profile identity (Discord identity is fetched live from Lanyard)
- `background.image` — background image (put files in `public/`)
- `links` — array of `{ title, subtitle, url, iconName }`; icons come from `IconMap` (add your own SVG if needed)

## Project Structure

```
app/
  api/music/route.ts     # returns current background track config
  api/views/route.ts     # Upstash Redis-backed view counter
  page.tsx               # main profile card
  layout.tsx             # root layout + Vercel Analytics
components/
  BackgroundMedia.tsx    # background image + music player
  DiscordStatus.tsx      # status dot on avatar (polls)
  DiscordActivities.tsx  # game/activity card (polls)
  SpotifyWidget.tsx      # now-playing widget (polls)
  ViewCounter.tsx        # profile view count
  useDiscordUser.ts      # live profile via Lanyard WebSocket
config.tsx               # site config + brand icons
```

## Scripts

```bash
npm run dev    # start dev server
npm run build  # production build
npm run start  # serve production build
npm run lint   # run eslint
```
