# Tarun Agrawal — Homepage

A single-file, zero-install personal homepage. Built with Tailwind via CDN + Google Fonts.

## Preview

Just double-click `index.html` to open it in your browser. No build step required.

If you prefer a local server (recommended for the marquee animation to render perfectly and to avoid any future asset path quirks):

```powershell
# From this folder, with Python on PATH:
python -m http.server 5173

# Or with Node (full install, not the Cursor-bundled one):
npx --yes serve -l 5173 .
```

Then visit http://localhost:5173.

## Section structure (borrowed from sahiranjum.com, content is yours)

1. Top nav
2. Marquee strip (skill keywords)
3. Hero
4. About
5. What I do (6 capability tiles)
6. Experience timeline (NOW → 2024 → 2022 → 2020 → 2014)
7. Clients (3UK · 3ROI · Singtel · Maxis · AT&T)
8. Certifications (placeholders — replace with real badges)
9. Testimonials (placeholders — replace with real quotes)
10. Motto ("Make it work, make it right, make it fast." — Kent Beck)
11. Footer / Connect (LinkedIn · Email · Phone · Location)

## Things you should personalize

- Replace **[Reviewer Name]** in the Testimonials section with real attributions.
- Replace the two placeholder certification cards (Databricks, Azure) with the actual ones once issued, or remove the section.
- Update the motto if you want one of your own.
- Confirm the contact details in the footer.

## Migrate to Vite + React + Tailwind later

When Node.js + npm is installed, this layout maps cleanly onto a Vite + React project:

```bash
npm create vite@latest homepage-react -- --template react-ts
cd homepage-react
npm i -D tailwindcss @tailwindcss/vite
```

Each `<section>` in `index.html` becomes a small component (`Hero.tsx`, `About.tsx`, `WhatIDo.tsx`, `Experience.tsx`, `Clients.tsx`, `Certifications.tsx`, `Testimonials.tsx`, `Motto.tsx`, `Footer.tsx`). The Tailwind classes carry over verbatim.
