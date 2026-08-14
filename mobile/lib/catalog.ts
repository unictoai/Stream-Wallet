export type ProviderOffer = {
  id: string;
  name: string;
  badge: string;
  url: string;
  quality: string;
  territory: string;
  playback: 'external';
};

export type Movie = {
  id: string;
  title: string;
  eyebrow: string;
  year: string;
  runtime: string;
  genre: string;
  rating: string;
  synopsis: string;
  poster: string;
  backdrop: string;
  provider: ProviderOffer;
};

export const catalog: Movie[] = [
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    eyebrow: 'A short film from the demo shelf',
    year: '2008',
    runtime: '10 min',
    genre: 'Animation',
    rating: 'Family',
    synopsis: 'A warm, playful short about a gentle giant who decides to push back against a trio of woodland bullies.',
    poster: require('../assets/images/poster-bunny.png'),
    backdrop: require('../assets/images/backdrop-bunny.png'),
    provider: {
      id: 'archive-demo-bbb',
      name: 'Open Film Archive',
      badge: 'Licensed demo source',
      url: 'https://archive.org/details/BigBuckBunny_328',
      quality: 'HD available',
      territory: 'Global demo',
      playback: 'external',
    },
  },
  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    eyebrow: 'The first open animation',
    year: '2006',
    runtime: '11 min',
    genre: 'Drama',
    rating: '13+',
    synopsis: 'Two travellers descend into a mysterious machine where every corridor seems to reveal a new idea about memory and work.',
    poster: require('../assets/images/poster-elephants.png'),
    backdrop: require('../assets/images/poster-elephants.png'),
    provider: {
      id: 'archive-demo-ed',
      name: 'Open Film Archive',
      badge: 'Licensed demo source',
      url: 'https://archive.org/details/ElephantsDream',
      quality: 'HD available',
      territory: 'Global demo',
      playback: 'external',
    },
  },
  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    eyebrow: 'A quiet science-fiction short',
    year: '2015',
    runtime: '12 min',
    genre: 'Sci-fi',
    rating: '13+',
    synopsis: 'On a windswept island, a lonely sheep discovers a strange machine that offers a life beyond the horizon.',
    poster: require('../assets/images/poster-cosmos.png'),
    backdrop: require('../assets/images/poster-cosmos.png'),
    provider: {
      id: 'archive-demo-cl',
      name: 'Open Film Archive',
      badge: 'Licensed demo source',
      url: 'https://archive.org/details/CosmosLaundromat',
      quality: 'HD available',
      territory: 'Global demo',
      playback: 'external',
    },
  },
];

export const genres = ['All', ...Array.from(new Set(catalog.map(movie => movie.genre)))];

export function getMovie(id: string | undefined) {
  return catalog.find(movie => movie.id === id);
}
