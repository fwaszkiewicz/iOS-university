// What works: Multiple array operations chained together.
// Custom extension: Check if a day has only online classes.
// Main difficulty: Organizing variables cleanly into map formats.

const weekSchedule = [
  { weekday: "monday", course: "Programming", classroom: "A12", isOnline: false },
  { weekday: "tuesday", course: "Databases", classroom: "online", isOnline: true },
  { weekday: "thursday", course: "Graphics", classroom: "B03", isOnline: false },
  { weekday: "friday", course: "UX", classroom: "online", isOnline: true }
];

const getClassesForDay = (day) => weekSchedule.filter(c => c.weekday === day);
const formatClasses = (courses) => courses.map(c => `${c.course} - ${c.classroom} (${c.isOnline ? 'Online' : 'In-person'})`);

// extension
const isFullyOnlineDay = (day) => {
  const classes = getClassesForDay(day);
  return classes.length > 0 && classes.every(c => c.isOnline);
};

console.log("Monday Schedule:", formatClasses(getClassesForDay("monday")));
console.log(`Total classes this week: ${weekSchedule.length}`);
console.log("Is Tuesday fully online?", isFullyOnlineDay("tuesday"));
