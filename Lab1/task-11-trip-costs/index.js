// What works: Aggregating object properties based on categories.
// Custom extension: Calculating how much each person to pay/receive to balance the costs evenly.
// Main difficulty: Dynamically building the accumulator object correctly.

const holidayCosts = [
  { desc: "accommodation", val: 420, payer: "Anna" },
  { desc: "fuel", val: 260, payer: "Piotr" },
  { desc: "food", val: 180, payer: "Anna" },
  { desc: "tickets", val: 140, payer: "Ola" }
];

const totalTripCost = holidayCosts.reduce((acc, cost) => acc + cost.val, 0);

const userTotals = holidayCosts.reduce((acc, cost) => {
  acc[cost.payer] = (acc[cost.payer] || 0) + cost.val;
  return acc;
}, {});

const topPayerEntry = Object.entries(userTotals).reduce((max, current) => current[1] > max[1] ? current : max);
const topPayer = topPayerEntry[0];

console.log(`Total trip cost: ${totalTripCost}`);
console.log("Paid by person:", userTotals);
console.log(`Top payer: ${topPayer} with ${userTotals[topPayer]}`);

// extension
const equalShare = totalTripCost / Object.keys(userTotals).length;
console.log(`\nEqual share per person: ${equalShare}`);
for (const [person, paid] of Object.entries(userTotals)) {
  const diff = paid - equalShare;
  if (diff > 0) console.log(`${person} should receive ${diff.toFixed(2)}`);
  else console.log(`${person} owes ${Math.abs(diff).toFixed(2)}`);
}
