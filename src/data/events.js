// Events. status: 'upcoming' | 'past'
// photos: put files in public\images\events\ (first photo = card cover). Missing photo shows an icon.
// Dates/locations still in [PLACEHOLDER] are hidden on the cards until you fill them.

export const events = [
  {
    id: 'term-exam-prize-giving-2026',
    status: 'past',
    category: 'Ceremony',
    title: 'Term Exam Prize Giving Ceremony 2026',
    date: '[PLACEHOLDER: date]',
    location: '[PLACEHOLDER: venue]',
    summary: 'Honouring the dedication and outstanding results of our students.',
    description: [
      'An-Noor Youth Welfare Association organised a Prize Giving Ceremony to honour and appreciate the students who achieved outstanding results in the recently conducted Fiqhul Islam Examination.',
      'We congratulate all award recipients on their remarkable achievement and encourage them to keep seeking beneficial knowledge and living by the teachings of Islam.',
      'May Allah (SWT) bless our students, their parents, our dedicated volunteers, and our generous donors whose invaluable support made this event a great success.',
    ],
    photos: ['/images/events/prize-giving-1.jpg', '/images/events/prize-giving-2.jpg'],
  },
  {
    id: 'annual-trip-2026',
    status: 'past',
    category: 'Trip',
    title: 'Annual Trip 2026',
    date: '[PLACEHOLDER: date]',
    location: '[PLACEHOLDER: destination]',
    summary: 'A beautiful journey with joyful moments and unforgettable memories.',
    description: [
      'Alhamdulillah, the An-Noor Welfare Association Annual Trip 2026 was a beautiful journey full of joyful moments and unforgettable memories together.',
    ],
    photos: ['/images/events/annual-trip-1.jpg'],
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
    photos: ['/images/events/football-poster.jpg', '/images/events/football-1.jpg'],
  },
  {
    id: 'childrens-day-oath-2026',
    status: 'past',
    category: 'Celebration',
    title: "Children's Day Celebration & Student Committee Oath Ceremony 2026",
    date: '[PLACEHOLDER: date]',
    location: '[PLACEHOLDER: venue]',
    summary: "A memorable Children's Day filled with joy, learning and leadership.",
    description: [
      "On the occasion of Children's Day, we celebrated our young minds and conducted the Student Committee Oath-Taking Ceremony for our senior students, encouraging them to embrace responsibility, discipline and leadership.",
      'Our sincere thanks to all the students who participated and made this event a memorable one.',
      "Together, let's inspire young minds and shape the leaders of tomorrow!",
    ],
    photos: ['/images/events/childrens-day-1.jpg'],
  },
]