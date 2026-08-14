// Midnight Ticket Stub: rights-safe demo catalog with provider handoffs, not hosted media.
export type Film = {
  id: string;
  title: string;
  year: string;
  type: string;
  genre: string;
  runtime: string;
  rating: string;
  language: string;
  captions: number;
  description: string;
  poster: string;
  backdrop: string;
  providerLabel: string;
  providerUrl: string;
  sourceNote: string;
  tags: string[];
};

export const films: Film[] = [
  {
    id: "cosmos-laundromat",
    title: "Cosmos Laundromat",
    year: "2015",
    type: "Short film",
    genre: "Animation · Fantasy",
    runtime: "12 min",
    rating: "8.4",
    language: "English",
    captions: 9,
    description: "A lonely sheep discovers a peculiar path toward a bigger life in this playful open-film story from the Blender animation community.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=2200&q=88",
    providerLabel: "Internet Archive · public demo",
    providerUrl: "https://archive.org/details/CosmosLaundromat",
    sourceNote: "Open-film demo link. Replace with a verified licensed provider before launch.",
    tags: ["Open film", "HD where available", "Captions"],
  },
  {
    id: "big-buck-bunny",
    title: "Big Buck Bunny",
    year: "2008",
    type: "Short film",
    genre: "Animation · Comedy",
    runtime: "10 min",
    rating: "8.1",
    language: "English",
    captions: 7,
    description: "A gentle woodland comedy with a big heart, presented as an open movie from the Blender animation community.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=88",
    providerLabel: "Blender Open Movies",
    providerUrl: "https://peach.blender.org/",
    sourceNote: "Official open-movie project link. Provider availability and quality are controlled externally.",
    tags: ["Open film", "HD where available", "Family"],
  },
  {
    id: "elephants-dream",
    title: "Elephants Dream",
    year: "2006",
    type: "Short film",
    genre: "Animation · Experimental",
    runtime: "11 min",
    rating: "7.8",
    language: "English",
    captions: 6,
    description: "Two strange travelers explore a machine-filled world in the first open movie created by the Blender Foundation.",
    poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2200&q=88",
    providerLabel: "Blender Open Movies",
    providerUrl: "https://orange.blender.org/",
    sourceNote: "Official open-movie project link. Provider availability and quality are controlled externally.",
    tags: ["Open film", "HD where available", "Experimental"],
  },
  {
    id: "sintel",
    title: "Sintel",
    year: "2010",
    type: "Short film",
    genre: "Animation · Adventure",
    runtime: "15 min",
    rating: "8.0",
    language: "English",
    captions: 8,
    description: "A young warrior searches for a lost dragon in a cinematic open movie made to showcase Blender’s filmmaking tools.",
    poster: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
    backdrop: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=88",
    providerLabel: "Blender Open Movies",
    providerUrl: "https://durian.blender.org/",
    sourceNote: "Official open-movie project link. Provider availability and quality are controlled externally.",
    tags: ["Open film", "HD where available", "Adventure"],
  },
];

export const genres = ["All", "Animation", "Comedy", "Fantasy", "Adventure", "Experimental"];

export function getFilm(id?: string) {
  return films.find((film) => film.id === id) ?? films[0];
}
