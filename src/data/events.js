// Events. status: 'upcoming' | 'past'
// photos: put files in public\images\events\ (first photo = card cover). Missing photo shows an icon.
// Dates/locations still in [PLACEHOLDER] are hidden on the cards until you fill them.

export const events = [
  {
    id: 'tarbiyah-bayan-2026-11',
    status: 'upcoming',
    category: 'Bayan',
    title: 'Tarbiyah Bayan',
    date: '21 November 2026',
    location: 'Mosque',
    summary: 'An evening Tarbiyah Bayan at the mosque.',
    description: [
      'An-Noor Youth Welfare Association invites you to an evening Tarbiyah Bayan at the mosque on 21 November 2026.',
      'Everyone is welcome to attend and benefit.',
    ],
    photos: ['/images/events/tarbiyah-bayan-1.png'],
  },
  {
    id: 'islam-gce-ol-seminar-2026',
    status: 'upcoming',
    category: 'Seminar',
    title: 'Islam GCE O/L Seminar',
    date: '22 November 2026',
    location: 'Daru Khadijah Ladies Arabic College,Wattala',
    summary: 'A seminar for GCE O/L Islam students.',
    description: [
      'An-Noor Youth Welfare Association is organising an Islam GCE O/L Seminar for O/L students on 22 November 2026.',
      'For more details, please check our Facebook page.',
    ],
    photos: ['/images/events/ol-seminar-1.png'],
  },
  {
    id: 'parents-meeting-2026-11',
    status: 'upcoming',
    category: 'Meeting',
    title: 'Parents Meeting',
    date: '29 November 2026',
    location: 'Daru Khadijah Ladies Arabic College,Wattala',
    summary: 'Parents meeting on 29 November, 4:00 PM to 5:30 PM.',
    description: [
      'A parents meeting will be held on 29 November 2026 from 4:00 PM to 5:30 PM.',
      'We kindly request all parents to attend.',
    ],
    photos: ['/images/events/parents-meeting-1.png'],
  },
  {
    id: 'indoor-event-2026-11',
    status: 'upcoming',
    category: 'Indoor Event',
    title: 'Indoor Event for An-Noor Students',
    date: '29 November 2026',
    location: '',
    summary: 'An indoor event for our An-Noor students.',
    description: [
      'An-Noor Youth Welfare Association is organising an indoor event for our An-Noor students on 29 November 2026.',
    ],
    photos: ['/images/events/indoor-event-1.png'],
  },
  {
    id: 'term-exam-prize-giving-2026',
    status: 'past',
    category: 'Ceremony',
    title: 'Term Exam Prize Giving Ceremony 2026',
   
    location: '[PLACEHOLDER: venue]',
    summary: 'Honouring the dedication and outstanding results of our students.',
    description: [
      'An-Noor Youth Welfare Association organised a Prize Giving Ceremony to honour and appreciate the students who achieved outstanding results in the recently conducted Fiqhul Islam Examination.',
      'We congratulate all award recipients on their remarkable achievement and encourage them to keep seeking beneficial knowledge and living by the teachings of Islam.',
      'May Allah (SWT) bless our students, their parents, our dedicated volunteers, and our generous donors whose invaluable support made this event a great success.',
    ],
    photos: ['/images/events/prize-giving-1.png', '/images/events/prize-giving-2.png', '/images/events/prize-giving-3.png', '/images/events/prize-giving-4.png'],
  },
  {
    id: 'annual-trip-2026',
    status: 'past',
    category: 'Trip',
    title: 'Annual Trip 2026',

    location: '[PLACEHOLDER: destination]',
    summary: 'A beautiful journey with joyful moments and unforgettable memories.',
    description: [
      'Alhamdulillah, the An-Noor Welfare Association Annual Trip 2026 was a beautiful journey full of joyful moments and unforgettable memories together.',
    ],
    photos: ['/images/events/annual-trip-1.jpg', '/images/events/annual-trip-2.jpg', '/images/events/annual-trip-3.jpg'],
  },
  {
    id: 'football-tournament-2026',
    status: 'past',
    category: 'Sports',
    title: 'Football Tournament (Senior Section)',
    date: 'September 2026',
    location: '[PLACEHOLDER: venue]',
    summary: 'A senior section football tournament organised by the association.',
    description: [
      'An-Noor Youth Welfare Association organised a football tournament for the senior section in September 2026.',
      '[PLACEHOLDER: Teams, winners and a short note about the day.]',
    ],
    photos: ['/images/events/football-poster.jpg', '/images/events/football-1.png', '/images/events/football-2.jpg'],
  },
  {
    id: 'childrens-day-oath-2026',
    status: 'past',
    category: 'Celebration',
    title: "Children's Day Celebration & Student Committee Oath Ceremony 2026",
   
    location: '[PLACEHOLDER: venue]',
    summary: "A memorable Children's Day filled with joy, learning and leadership.",
    description: [
      "On the occasion of Children's Day, we celebrated our young minds and conducted the Student Committee Oath-Taking Ceremony for our senior students, encouraging them to embrace responsibility, discipline and leadership.",
      'Our sincere thanks to all the students who participated and made this event a memorable one.',
      "Together, let's inspire young minds and shape the leaders of tomorrow!",
    ],
    photos: ['/images/events/childrens-day-1.jpg', '/images/events/childrens-day-2.jpg', '/images/events/childrens-day-3.jpg'],
    video: '/videos/childrens-day.mp4',
  },
]