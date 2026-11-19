# An-Noor Youth Welfare Association Website

Official website of **An-Noor Youth Welfare Association**, a non-profit youth organisation based in Hunupitiya, Wattala, Sri Lanka (since 2022).

**Live site:** https://an-noor-mu.vercel.app

<!-- [PLACEHOLDER: add a screenshot here]
![Home page](./docs/home.png)
-->

## Pages

- **Home**: hero, about preview, leadership messages, support call-to-action
- **About**
- **Events**
- **Projects**: filter by status and category
- **Committee**: Executive Committee (`/committee`)
- **Student Board**: `/committee/student-board`
- **Gallery**
- **Support Us**: bank details
- **Contact**

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (design tokens in `src/index.css`)
- [react-router-dom](https://reactrouter.com/)
- [framer-motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/)
- [react-helmet-async](https://github.com/staylor/react-helmet-async)

## Getting Started

**Requirements:** Node.js 18+ and npm

```bash
# clone
git clone https://github.com/sharaf-official/An-Noor.git
cd An-Noor

# install
npm install

# run locally
npm run dev
```

Open http://localhost:5173

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
public/
  images/            # leadership, student-board, projects, gallery photos
src/
  components/
    layout/          # navbar, footer, page loader
    home/            # home page sections
    ui/              # shared UI (PageBanner, SectionTitle, ActivityList, ...)
    forms/
    committee/       # CommitteeTabs, MemberCard
  data/              # all site content (edit here, no code changes needed)
    committee.js
    studentBoard.js
    leadership.js
    projects.js
    events.js
  pages/             # one file per route
  index.css          # Tailwind + theme tokens
```

## Updating Content

Most content lives in `src/data/`:

| What to change | File |
| --- | --- |
| Executive Committee, members, year | `src/data/committee.js` |
| Student Board, mentors | `src/data/studentBoard.js` |
| Home leadership messages | `src/data/leadership.js` |
| Projects (status, category, photos) | `src/data/projects.js` |
| Events | `src/data/events.js` |

**Projects:** `status` must be `'ongoing'` or `'completed'`. Filter tabs are defined in `src/pages/Projects.jsx`; a tab can also filter by `category`.

**Photos:** put files in `public/images/...`. Use **lowercase file names with no spaces** (hosting is case-sensitive). Compress large photos (under about 1 MB) before adding them.

## Theme

| Token | Colour |
| --- | --- |
| `brand-navy` | `#0d1650` |
| `brand-dark` | `#080e33` |
| `brand-blue` | `#2f6db5` |
| `brand-gold` | `#d9a441` |
| `brand-gold-dark` | `#a97a1f` |
| `brand-cream` | `#fdf8ec` |
| `brand-soft` | `#eaf1fb` |

Fonts: Playfair Display (headings), Poppins (body), Lora (quotes).

## Deployment

Deployed on Vercel. Every push to `main` triggers a new deployment.

## Contact

- Email: annooryouthwelfareassociation@gmail.com
- Address: No: 754, Al Badriya Jumma Masjid, Welegoda, Wattala, Sri Lanka

## Credits

Designed and developed by **Sharaf Izam** ([@sharaf-official](https://github.com/sharaf-official)).

&copy; An-Noor Youth Welfare Association. All rights reserved.