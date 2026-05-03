// What works: reduce() for totals, filter() for long activities, template literals.
// Custom extension: Identifying the most calorie-intensive workout.
// Main difficulty: Finding the max object property.

const weekActivities = [
  { workoutType: "run", durationMins: 35, burnedCals: 320 },
  { workoutType: "bike", durationMins: 50, burnedCals: 410 },
  { workoutType: "walk", durationMins: 20, burnedCals: 90 },
  { workoutType: "gym", durationMins: 60, burnedCals: 450 }
];

const totalMins = weekActivities.reduce((acc, act) => acc + act.durationMins, 0);
const totalCals = weekActivities.reduce((acc, act) => acc + act.burnedCals, 0);

const longWorkouts = weekActivities.filter(act => act.durationMins > 30);

// extension
const mostCaloric = [...weekActivities].sort((a, b) => b.burnedCals - a.burnedCals)[0];

console.log(`Weekly Report:`);
console.log(`Total time: ${totalMins} minutes`);
console.log(`Total calories: ${totalCals} kcal`);
console.log(`Workouts over 30 mins: ${longWorkouts.length}`);
console.log(`Most intense workout: ${mostCaloric.workoutType} (${mostCaloric.burnedCals} kcal)`);
