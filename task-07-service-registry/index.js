// What works: find(), map() with spread syntax for immutable update.
// Custom extension: Add a function to return only completed repairs.
// Main difficulty: Immutable updates for nested/specific array elements.

const serviceRepairs = [
  { recordId: 1, customer: "Anna", gadget: "laptop", state: "new" },
  { recordId: 2, customer: "Piotr", gadget: "phone", state: "in progress" },
  { recordId: 3, customer: "Ola", gadget: "tablet", state: "completed" }
];

const targetRepair = serviceRepairs.find(r => r.recordId === 2);
console.log("Found:", targetRepair);

const updatedRepairs = serviceRepairs.map(r => 
  r.recordId === 1 ? { ...r, state: "in progress" } : r
);

const inProgressCount = updatedRepairs.filter(r => r.state === "in progress").length;

console.log("Original state length for 'in progress':", serviceRepairs.filter(r => r.state === "in progress").length);
console.log("Updated state length for 'in progress':", inProgressCount);

// extension
const completedRepairs = updatedRepairs.filter(r => r.state === "completed");
console.log("Completed only:", completedRepairs);
