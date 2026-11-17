export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  {
    to: '/committee',
    label: 'Committee',
    children: [
      { to: '/committee', label: 'Executive Committee' },
      { to: '/committee/student-board', label: 'Student Board' },
    ],
  },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export const footerLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/committee', label: 'Executive Committee' },
  { to: '/committee/student-board', label: 'Student Board' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/support', label: 'Support Us' },
  { to: '/contact', label: 'Contact' },
]