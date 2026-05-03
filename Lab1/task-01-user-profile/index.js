// What works: Object creation, property access, template literals logging.
// Custom extension: Added 'hobbies' array and 'isAdult' function, formatted output based on 'isAdult'.
// Main difficulty: Organizing string interpolation cleanly.

const studentProfile = {
  firstName: "Jan",
  lastName: "Kowalski",
  city: "Katowice",
  age: 21,
  fieldOfStudy: "Computer Science",
  hobbies: ["gaming", "reading"]
};

console.log(studentProfile.firstName + " " + studentProfile.lastName);
console.log(`${studentProfile.firstName} lives in ${studentProfile.city} and studies ${studentProfile.fieldOfStudy}.`);
console.log(`Is ${studentProfile.firstName} an adult? ${studentProfile.age >= 18 ? 'Yes' : 'No'}`);
console.log(`One of his hobbies is ${studentProfile.hobbies[0]}.`);
