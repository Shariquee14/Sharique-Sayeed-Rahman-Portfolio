// ============================================================
// ADD YOUR WORK HERE.  One line = one image on the wall.
//
//   src     the image file. Put it in  public/creatives/  and write its name.
//   alt     short description (for screen readers).
//   aspect  the card shape:  'square'  |  'portrait'  |  'landscape'
//           (optional; leave it out and the card is square)
//
// To REPLACE an image: change only the file name in its line (or drop a
// new file with the same name into public/creatives/).
// The wall counts the lines itself, so 35 now, any number later.
// ============================================================

// Builds the right path on GitHub Pages (or any base path).
const img = (file) => `${import.meta.env.BASE_URL}creatives/${file}`

export const creatives = [
  { src: img('01-video-edits-square.jpg'), alt: 'Video edits poster', aspect: 'square' },
  { src: img('02-ai-tools-square.jpg'), alt: 'AI tools', aspect: 'square' },
  { src: img('03-corkboard-portrait.jpg'), alt: 'Corkboard graphic design', aspect: 'portrait' },
  { src: img('04-branding-square.jpg'), alt: 'Branding', aspect: 'square' },
  { src: img('05-square.jpg'), alt: 'Creative work 5', aspect: 'square' },
  { src: img('06-portrait.jpg'), alt: 'Creative work 6', aspect: 'portrait' },
  { src: img('07-portrait.jpg'), alt: 'Creative work 7', aspect: 'portrait' },
  { src: img('08-portrait.jpg'), alt: 'Creative work 8', aspect: 'portrait' },
  { src: img('09-portrait.jpg'), alt: 'Creative work 9', aspect: 'portrait' },
  { src: img('10-landscape.jpg'), alt: 'Creative work 10', aspect: 'landscape' },
  { src: img('11-portrait.jpg'), alt: 'Creative work 11', aspect: 'portrait' },
  { src: img('12-square.jpg'), alt: 'Creative work 12', aspect: 'square' },
  { src: img('13-portrait.jpg'), alt: 'Creative work 13', aspect: 'portrait' },
  { src: img('14-landscape.jpg'), alt: 'Creative work 14', aspect: 'landscape' },
  { src: img('15-landscape.jpg'), alt: 'Creative work 15', aspect: 'landscape' },
  { src: img('16-landscape.jpg'), alt: 'Creative work 16', aspect: 'landscape' },
  { src: img('17-portrait.jpg'), alt: 'Creative work 17', aspect: 'portrait' },
  { src: img('18-square.jpg'), alt: 'Creative work 18', aspect: 'square' },
  { src: img('19-landscape.jpg'), alt: 'Creative work 19', aspect: 'landscape' },
  { src: img('20-square.jpg'), alt: 'Creative work 20', aspect: 'square' },
  { src: img('21-square.jpg'), alt: 'Creative work 21', aspect: 'square' },
  { src: img('22-square.jpg'), alt: 'Creative work 22', aspect: 'square' },
  { src: img('23-square.jpg'), alt: 'Creative work 23', aspect: 'square' },
  { src: img('24-square.jpg'), alt: 'Creative work 24', aspect: 'square' },
  { src: img('25-square.jpg'), alt: 'Creative work 25', aspect: 'square' },
  { src: img('26-square.jpg'), alt: 'Creative work 26', aspect: 'square' },
  { src: img('27-square.jpg'), alt: 'Creative work 27', aspect: 'square' },
  { src: img('28-square.jpg'), alt: 'Creative work 28', aspect: 'square' },
  { src: img('29-square.jpg'), alt: 'Creative work 29', aspect: 'square' },
  { src: img('30-square.jpg'), alt: 'Creative work 30', aspect: 'square' },
  { src: img('31-square.jpg'), alt: 'Creative work 31', aspect: 'square' },
  { src: img('32-square.jpg'), alt: 'Creative work 32', aspect: 'square' },
  { src: img('33-portrait.jpg'), alt: 'Creative work 33', aspect: 'portrait' },
  { src: img('34-square.jpg'), alt: 'Creative work 34', aspect: 'square' },
  { src: img('35-portrait.jpg'), alt: 'Creative work 35', aspect: 'portrait' },
]
