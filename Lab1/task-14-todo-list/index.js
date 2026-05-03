// What works: Immutable state patterns, mapping/filtering.
// Custom extension: Added task deletion (immutable).
// Main difficulty: Keeping arrays immutable.

let activeTodos = [
  { taskId: 1, label: "Submit project", isDone: false },
  { taskId: 2, label: "Read chapter", isDone: true },
  { taskId: 3, label: "Prepare slides", isDone: false }
];

const addTodo = (list, newLabel) => [...list, { taskId: Date.now(), label: newLabel, isDone: false }];
const markDone = (list, id) => list.map(t => t.taskId === id ? { ...t, isDone: true } : t);
const getPending = (list) => list.filter(t => !t.isDone);

// extension
const removeTodo = (list, id) => list.filter(t => t.taskId !== id);

const afterAdd = addTodo(activeTodos, "Reply to emails");
const afterMark = markDone(afterAdd, 1);
const pendingOnly = getPending(afterMark);
const afterRemove = removeTodo(pendingOnly, 3);

console.log("Pending:", pendingOnly);
console.log("After removal ID 3:", afterRemove);
