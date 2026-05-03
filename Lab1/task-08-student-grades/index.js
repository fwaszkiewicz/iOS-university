// What works: reduce() for average, ternary for status.
// Custom extension: Text classification of the final average (Very Good, Good, etc.).
// Main difficulty: Managing float precision in JavaScript.

const studentScores = [3.0, 4.0, 5.0, 3.5, 4.5];
const PASS_THRESHOLD = 3.0;

function evaluateResults(scores) {
  const sum = scores.reduce((acc, val) => acc + val, 0);
  const avg = sum / scores.length;
  
  const isPassed = avg >= PASS_THRESHOLD ? "Passed" : "Failed";
  
  // extension
  let classification = "Satisfactory";
  if (avg >= 4.5) classification = "Very Good";
  else if (avg >= 4.0) classification = "Good";
  
  return {
    average: avg.toFixed(2),
    status: isPassed,
    gradeClassification: classification
  };
}

console.log(evaluateResults(studentScores));
