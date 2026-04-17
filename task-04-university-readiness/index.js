// What works: Boolean logic, if/else, ternary operator, && operator.
// Custom extension: Added 'hasCoffee' variable to determine mood.
// Main difficulty: Organizing multiple boolean checks concisely.

const ownsLaptop = true;
const ownsCharger = false;
const ownsNotebook = true;
const hasCoffee = true; // extension
const currentDayType = "laboratory";

if (ownsLaptop && ownsNotebook) {
  console.log("Ready for basic classes.");
} else {
  console.log("Missing essential items.");
}

const readinessStatus = (ownsLaptop && ownsNotebook && ownsCharger) ? "Fully prepared" : "Partially prepared";
console.log(readinessStatus);

!ownsCharger && console.log("Warning: You forgot your charger!");

if (currentDayType === "laboratory") {
  console.log("It's a lab day, make sure your laptop is charged!");
}

hasCoffee && console.log("At least you have coffee!"); // extension
