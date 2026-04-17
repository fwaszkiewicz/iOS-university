// What works: Function definition, default parameters, template literals.
// Custom extension: Numbered list formatting for tasks.
// Main difficulty: String manipulation for the numbered list.

const myTasks = ["classes", "shopping", "workout"];

function generateDayPlan(personName, dailyTasks = []) {
  if (dailyTasks.length === 0) return `${personName} has a free day today!`;
  
  // extension: numbering
  const taskListText = dailyTasks.map((task, index) => `${index + 1}. ${task}`).join("\n");
  
  return `${personName}'s plan:\n${taskListText}\nTotal tasks: ${dailyTasks.length}`;
}

console.log(generateDayPlan("Alex", myTasks));
console.log("---");
console.log(generateDayPlan("Sam"));
