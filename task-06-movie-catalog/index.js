// What works: Array filtering, mapping, multiple criteria.
// Custom extension: Added a function to find movies by category.
// Main difficulty: Keeping pure functions.

const filmList = [
  { filmTitle: "Arrival", genre: "sci-fi", score: 8.1, isWatched: true },
  { filmTitle: "Whiplash", genre: "drama", score: 8.5, isWatched: false },
  { filmTitle: "Dune", genre: "sci-fi", score: 8.0, isWatched: false },
  { filmTitle: "Inside Out", genre: "animation", score: 8.1, isWatched: true },
  { filmTitle: "Blade Runner", genre: "sci-fi", score: 8.2, isWatched: false } // extension
];

const unwatchedFilms = filmList.filter(f => !f.isWatched);
const highlyRatedFilms = filmList.filter(f => f.score > 8.0);
const highlyRatedTitles = highlyRatedFilms.map(f => f.filmTitle);

console.log(`Unwatched: ${unwatchedFilms.length}`);
console.log(`Highly rated titles: ${highlyRatedTitles.join(", ")}`);

// extension
const getMoviesByGenre = (genre) => filmList.filter(f => f.genre === genre).map(f => f.filmTitle);
console.log(`Sci-Fi movies: ${getMoviesByGenre("sci-fi").join(", ")}`);
