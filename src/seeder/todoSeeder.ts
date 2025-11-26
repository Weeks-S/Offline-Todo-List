import type { Todo } from "../types/todo.types";

export const todos: Todo[] = [
  {
    id: 1,
    name: "Buy groceries",
    category: "Personal",
    status: false,
  },
  {
    id: 2,
    name: "Finish project report",
    category: "Work",
    status: true,
  },
  {
    id: 3,
    name: "Clean the house",
    category: "Personal",
    status: false,
  },
  {
    id: 4,
    name: "Prepare presentation slides",
    category: "Work",
    status: false,
  },
  {
    id: 5,
    name: "Go for a run",
    category: "Personal",
    status: true,
  },
  {
    id: 6,
    name: "Call mom",
    category: "Personal",
    status: false,
  },
  {
    id: 7,
    name: "Fix bug in codebase",
    category: "Work",
    status: true,
  },
  {
    id: 8,
    name: "Read a book",
    category: "Learning",
    status: false,
  },
  {
    id: 9,
    name: "Plan weekend trip",
    category: "Personal",
    status: false,
  },
  {
    id: 10,
    name: "Update resume",
    category: "Career",
    status: true,
  },
];
