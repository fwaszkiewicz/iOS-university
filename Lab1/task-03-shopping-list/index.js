// What works: Array of objects, map, filter.
// Custom extension: Added a category field and filtered by urgent AND specific category.
// Main difficulty: Chaining array methods.

const groceries = [
  { itemName: "bread", amount: 2, isUrgent: true, category: "food" },
  { itemName: "milk", amount: 1, isUrgent: false, category: "food" },
  { itemName: "eggs", amount: 10, isUrgent: true, category: "food" },
  { itemName: "soap", amount: 3, isUrgent: false, category: "hygiene" } // extension
];

groceries.forEach(g => console.log(`${g.amount}x ${g.itemName}`));

const urgentGroceries = groceries.filter(g => g.isUrgent);
const uppercaseNames = groceries.map(g => g.itemName.toUpperCase());
const hygieneItems = groceries.filter(g => g.category === 'hygiene'); // extension

console.log(`Urgent items count: ${urgentGroceries.length}`);
console.log(`All items uppercase: ${uppercaseNames.join(", ")}`);
console.log(`Hygiene items: ${hygieneItems.map(h => h.itemName).join(", ")}`);
