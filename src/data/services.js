export const serviceKeys = [
  'digital',
  'matching',
  'promotion',
  'intelligence',
  'investment',
  'export',
]

export const serviceImages = {
  // Digital Business Platform — site screenshot
  digital: '/images/services/digital-platform.png',
  // Business matching / team collaboration meeting
  matching:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80',
  // Trade promotion / conference expo hall
  promotion:
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
  // Market intelligence / data charts laptop
  intelligence:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  // Investment facilitation / finance capital
  investment:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
  // Export-import / logistics shipping containers
  export:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
}

export function getServiceImage(slug) {
  return serviceImages[slug] || serviceImages.digital
}
