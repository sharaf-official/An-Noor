import { events } from './events'
import { projects } from './projects'

// Photos from Events and Projects appear here automatically.
// Extra photos: put PNG files in public\images\gallery\ named photo-01.png ... photo-20.png
// Then replace each [PLACEHOLDER] caption. Delete the lines you do not use.
// group = the filter tab name on the Gallery page (same name = same tab).
export const extraPhotos = [
  { src: '/images/gallery/photo-01.png', caption: '[PLACEHOLDER: caption 1]', group: 'Moments' },
  { src: '/images/gallery/photo-02.png', caption: '[PLACEHOLDER: caption 2]', group: 'Moments' },
  { src: '/images/gallery/photo-03.png', caption: '[PLACEHOLDER: caption 3]', group: 'Moments' },
  { src: '/images/gallery/photo-04.png', caption: '[PLACEHOLDER: caption 4]', group: 'Moments' },
  { src: '/images/gallery/photo-05.png', caption: '[PLACEHOLDER: caption 5]', group: 'Moments' },
  { src: '/images/gallery/photo-06.png', caption: '[PLACEHOLDER: caption 6]', group: 'Moments' },
  { src: '/images/gallery/photo-07.png', caption: '[PLACEHOLDER: caption 7]', group: 'Moments' },
  { src: '/images/gallery/photo-08.png', caption: '[PLACEHOLDER: caption 8]', group: 'Moments' },
  { src: '/images/gallery/photo-09.png', caption: '[PLACEHOLDER: caption 9]', group: 'Moments' },
  { src: '/images/gallery/photo-10.png', caption: '[PLACEHOLDER: caption 10]', group: 'Moments' },
  { src: '/images/gallery/photo-11.png', caption: '[PLACEHOLDER: caption 11]', group: 'Moments' },
  { src: '/images/gallery/photo-12.png', caption: '[PLACEHOLDER: caption 12]', group: 'Moments' },
  { src: '/images/gallery/photo-13.png', caption: '[PLACEHOLDER: caption 13]', group: 'Moments' },
  { src: '/images/gallery/photo-14.png', caption: '[PLACEHOLDER: caption 14]', group: 'Moments' },
  { src: '/images/gallery/photo-15.png', caption: '[PLACEHOLDER: caption 15]', group: 'Moments' },
  { src: '/images/gallery/photo-16.png', caption: '[PLACEHOLDER: caption 16]', group: 'Moments' },
  { src: '/images/gallery/photo-17.png', caption: '[PLACEHOLDER: caption 17]', group: 'Moments' },
  { src: '/images/gallery/photo-18.png', caption: '[PLACEHOLDER: caption 18]', group: 'Moments' },
  { src: '/images/gallery/photo-19.png', caption: '[PLACEHOLDER: caption 19]', group: 'Moments' },
  { src: '/images/gallery/photo-20.png', caption: '[PLACEHOLDER: caption 20]', group: 'Moments' },
  { src: '/images/gallery/photo-21.png', caption: '[PLACEHOLDER: caption 21]', group: 'Moments' },
  { src: '/images/gallery/photo-22.png', caption: '[PLACEHOLDER: caption 22]', group: 'Moments' },
  { src: '/images/gallery/photo-23.png', caption: '[PLACEHOLDER: caption 23]', group: 'Moments' },
]

const fromList = (list, group) =>
  list.flatMap((it) => (it.photos || []).map((src) => ({ src, caption: it.title, group })))

export const galleryItems = [
  ...fromList(events, 'Events'),
  ...fromList(projects, 'Projects'),
  ...extraPhotos,
]