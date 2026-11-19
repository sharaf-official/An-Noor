# An-Noor Youth Welfare Association Website

The official website of the An-Noor Youth Welfare Association (Hunupitiya, Sri Lanka, since 2022). The site introduces the association, its leadership and student board, and showcases its events, projects and gallery. It also gives visitors a way to support the association and get in touch.

## Pages and Sections

- **Home** - Introduction to the association, highlights and messages from the leadership.
- **About** - Who we are, our mission and focus areas, and messages from the leadership team.
- **Events** - Upcoming and past events with photo galleries and details.
- **Projects** - Community service projects (ongoing and completed) with photos, videos and details.
- **Committee**
  - **Executive Committee** - Office bearers and committee members.
  - **Student Board** - Mentors, President and Vice Presidents, and the student board team with filters.
- **Gallery** - Photo gallery of the association's activities.
- **Support Us** - Donation and bank details for those who wish to contribute.
- **Contact** - Contact details and enquiry information.

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React (icons)
- Deployed on Vercel

## Folder Structure

```
.
├── public/
│   ├── images/          Photos and logos (events, projects, committee, etc.)
│   └── videos/          Video files used in projects or events
├── src/
│   ├── components/
│   │   ├── ui/          Shared UI (PageBanner, SectionTitle, ActivityList, ActivityModal)
│   │   ├── committee/   Committee components (CommitteeTabs, etc.)
│   │   └── home/        Home and About sections (LeadershipMessages, etc.)
│   ├── pages/           One file per page (Home, About, Events, Projects, StudentBoard, ...)
│   ├── data/            Editable content (leadership, student board, events, projects)
│   ├── App.jsx          Routes
│   └── main.jsx         App entry point
├── index.html
├── package.json
└── vite.config.js
```

## Running Locally

Requirements: Node.js 18 or later and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`.

## Building and Deploying

Create a production build:

```bash
npm run build
```

The output is generated in the `dist/` folder. To preview the build locally:

```bash
npm run preview
```

### Deploying to Vercel

1. Push the project to a GitHub repository.
2. In Vercel, choose "Add New Project" and import the repository.
3. Use these settings (Vercel normally detects them automatically):
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click Deploy. Every push to the main branch will redeploy the site automatically.

## Updating Content

Most content is stored in the `src/data/` folder, so pages do not need to be edited for routine updates. File names may differ slightly in your project; search the `src/data/` folder for the matching file.

| What to update | File |
| --- | --- |
| Leadership messages (Chief Advisor, President, General Secretary, Vice President) | `src/data/leadership.js` |
| Student Board (mentors, president, vice presidents, office bearers, heads, members) | `src/data/studentBoard.js` |
| Events | `src/data/events.js` |
| Projects | `src/data/projects.js` |

### Student Board

In `src/data/studentBoard.js`, set `BOARD_READY` to `true` once the members are ready to be shown. While it is `false`, the page displays a "Coming Soon" message. Update `boardYear` and `intro` for each new term.

### Events and Projects

Each entry is an object with fields such as `title`, `category`, `date`, `location`, `summary` and `description`. Projects also use `status` (`'ongoing'` or `'completed'`). Example:

```js
{
  id: 'book-distribution-2026',
  status: 'completed',
  category: 'Education',
  title: 'A Gift of Knowledge: Book Distribution',
  date: '19 September 2026',
  summary: 'New textbooks distributed to our students.',
  description: [
    'First paragraph.',
    'Second paragraph.',
  ],
  photos: [
    '/images/projects/book-distribution-1.jpg',
    '/images/projects/book-distribution-2.jpg',
  ],
  video: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
}
```

- The first photo is used as the card cover.
- Add more photos to the `photos` array to enable the gallery (arrows, swipe and thumbnails).
- `video` accepts a YouTube link or a path to a file in `public/videos/` (for example `'/videos/youth-counselling.mp4'`). Use `videos: [...]` for more than one.
- Text such as `[PLACEHOLDER: date]` is hidden in the popup until it is replaced with real content.

### Images and Videos

- Place images in `public/images/` (for example `public/images/projects/`, `public/images/events/`).
- Place videos in `public/videos/`. For large videos (over about 20 MB), an unlisted YouTube link is recommended.
- Reference files from the data files starting with a slash, for example `/images/projects/photo-1.jpg`. Do not include `public` in the path.
- Use lightweight images (compressed JPG or WebP) to keep the site fast.

## License

All content, logos and photos belong to the An-Noor Youth Welfare Association. Do not reuse them without permission.