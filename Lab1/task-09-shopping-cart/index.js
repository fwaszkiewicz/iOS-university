// What works: map() for descriptions, reduce() for totals, conditional logic.
// Custom extension: Extra discount for specific items (like 'Juice').
// Main difficulty: Applying multiple discount rules.

const shoppingBasket = [
  { product: "Bread", itemPrice: 4.5, count: 2 },
  { product: "Cheese", itemPrice: 9.9, count: 1 },
  { product: "Juice", itemPrice: 6.2, count: 3 }
];

const DISCOUNT_THRESHOLD = 30;
const DISCOUNT_PERCENTAGE = 10;

const itemDescriptions = shoppingBasket.map(item => `${item.count} × ${item.product}`);
const totalValue = shoppingBasket.reduce((acc, item) => acc + (item.itemPrice * item.count), 0);

let finalValue = totalValue;
if (totalValue > DISCOUNT_THRESHOLD) {
  finalValue -= totalValue * (DISCOUNT_PERCENTAGE / 100);
}

// extension
const juiceDiscount = shoppingBasket.find(i => i.product === "Juice") ? 2 : 0;
finalValue -= juiceDiscount;

console.log("Items:");
itemDescriptions.forEach(desc => console.log(desc));
console.log(`Total before discount: ${totalValue.toFixed(2)}`);
console.log(`Final total: ${finalValue.toFixed(2)} (Includes special discounts)`);
