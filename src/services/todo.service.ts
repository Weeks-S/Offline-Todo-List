import { todos as initialTodos } from "../seeder/todoSeeder";
import type { category, Todo } from "../types/todo.types";

let todos: Todo[] = [...initialTodos];

const todoService = {
  getTodos(): Todo[] {
    return [...todos];
  },

  addTodo(name: string, category?: category): Todo {
    const newTodo: Todo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      name,
      category,
      status: false,
    };
    todos = [...todos, newTodo];
    return newTodo;
  },

  updateTodo(id: number, updates: Partial<Todo>): Todo | null {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const updated = { ...todos[index], ...updates };
    todos = todos.map((t, i) => (i === index ? updated : t));
    return updated;
  },

  deleteTodo(id: number): boolean {
    const exists = todos.some((t) => t.id === id);
    if (!exists) return false;
    todos = todos.filter((t) => t.id !== id);
    return true;
  },

  toggleTodo(id: number): Todo | null {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const updated = { ...todos[index], status: !todos[index].status };
    todos = todos.map((t, i) => (i === index ? updated : t));
    return updated;
  },

  searchTodos(
    searchTerm: string,
    statusFilter: "All" | "Completed" | "Pending" = "All",
    categoryFilter: category | "All" = "All"
  ): Todo[] {
    const term = searchTerm.toLowerCase();

    return todos.filter((todo) => {
      const matchesSearch = todo.name.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && todo.status) ||
        (statusFilter === "Pending" && !todo.status);
      const matchesCategory =
        categoryFilter === "All" || todo.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  },
};

export const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  searchTodos,
} = todoService;
