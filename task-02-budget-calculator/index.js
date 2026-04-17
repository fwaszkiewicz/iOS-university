// What works: Array creation, reduce for sum, averaging, finding max.
// Custom extension: Added a minimum expense calculation constraint and formatted the output using a helper function.
// Main difficulty: Remembering the initial value for reduce.

const weeklyExpenses = [18.5, 42, 9.99, 27, 61.3, 15, 33.5];

const totalExpenses = weeklyExpenses.reduce((acc, curr) => acc + curr, 0);
const averageExpense = totalExpenses / weeklyExpenses.length;
const maxExpense = Math.max(...weeklyExpenses);
const minExpense = Math.min(...weeklyExpenses); // extension

console.log(`Report:
Total: ${totalExpenses.toFixed(2)}
Average: ${averageExpense.toFixed(2)}
Max: ${maxExpense}
Min: ${minExpense}`);
