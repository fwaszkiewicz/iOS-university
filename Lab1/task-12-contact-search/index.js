// What works: Filter by property, mapping formatted strings.
// Custom extension: Partial name matching.
// Main difficulty: Organizing generic search functions.

const phoneBook = [
  { fullName: "Anna Nowak", phoneNum: "500-100-200", town: "Katowice", isFav: true },
  { fullName: "Piotr Lis", phoneNum: "501-300-700", town: "Sosnowiec", isFav: false },
  { fullName: "Ola Marek", phoneNum: "502-400-900", town: "Katowice", isFav: true }
];

const getByTown = (townName) => phoneBook.filter(c => c.town === townName);
const getFavs = () => phoneBook.filter(c => c.isFav);
const formatContacts = (list) => list.map(c => `${c.fullName} - ${c.phoneNum}`);

// extension
const searchByName = (query) => phoneBook.filter(c => c.fullName.toLowerCase().includes(query.toLowerCase()));

console.log("Katowice contacts:", formatContacts(getByTown("Katowice")));
console.log("Favorites:", formatContacts(getFavs()));
console.log("Search for 'lis':", formatContacts(searchByName("lis")));
