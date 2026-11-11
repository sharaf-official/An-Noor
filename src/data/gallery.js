import { events } from './events'
import { projects } from './projects'

// Photos from Events and Projects appear here automatically.
// Add other photos in public\images\gallery\ and list them below.
export const extraPhotos = [
  // { src: '/images/gallery/photo-1.jpg', caption: 'Caption', group: 'Moments' },
]

const fromList = (list, group) =>
  list.flatMap((it) => (it.photos || []).map((src) => ({ src, caption: it.title, group })))

export const galleryItems = [
  ...fromList(events, 'Events'),
  ...fromList(projects, 'Projects'),
  ...extraPhotos,
]