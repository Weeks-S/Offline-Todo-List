import { useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";
import type { Todo, category } from "../types/todo.types";
import {
  addTodo,
  deleteTodo,
  getTodos,
  searchTodos,
  toggleTodo,
} from "../services/todo.service";
import { PiPlus } from "react-icons/pi";
import { BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { startLoading, stopLoading } from "../store/slices/uiSlice";
import Loading from "../components/loading/Loading";

export default function TodoPages() {
  const loading = useAppSelector((s) => s.ui.globalLoading);
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addForm, setAddForm] = useState<boolean>(false);
  const [searchTodo, setSearchTodo] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Completed" | "Pending"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState<category | "All">("All");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    dispatch(startLoading());
    const handler = setTimeout(() => {
      dispatch(stopLoading());
      setDebounce(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const results = searchTodos(debounce, statusFilter, categoryFilter);
    setTodos(results);
  }, [debounce, statusFilter, categoryFilter]);

  const handleAddTodo = (name: string, category?: category) => {
    addTodo(name, category);
    setTodos(getTodos());
  };

  const handleToggle = (id: number) => {
    toggleTodo(id);
    setTodos(getTodos());
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
    setTodos(getTodos());
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <button
          className={`text-white transition flex ${
            !addForm ? "bg-green-400" : "bg-red-400"
          } px-4 py-2 rounded-2xl mb-4 transition-colors duration-300`}
          onClick={() => setAddForm(!addForm)}
        >
          {!addForm ? (
            <PiPlus className="w-6 h-6" />
          ) : (
            <BiX className="w-6 h-6" />
          )}{" "}
          Add Todo
        </button>
        <button
          className={`text-white transition flex ${
            !searchTodo ? "bg-blue-400" : "bg-red-400"
          } px-4 py-2 rounded-2xl mb-4 transition-colors duration-300`}
          onClick={() => setSearchTodo(!searchTodo)}
        >
          {!searchTodo ? (
            <PiPlus className="w-6 h-6" />
          ) : (
            <BiX className="w-6 h-6" />
          )}{" "}
          Search
        </button>
      </div>
      <div
        className={`overflow-hidden ${
          searchTodo ? "max-h-[200px]" : "max-h-0"
        } transition-all ease-in-out duration-500 mb-4 space-x-2`}
      >
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border p-2"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as category | "All")
          }
          className="border p-2"
        >
          <option value="All">All Categories</option>
          <option value="Career">Career</option>
          <option value="Development">Development</option>
          <option value="Learning">Learning</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
      </div>
      <div
        className={`overflow-hidden ${
          addForm ? "max-h-[200px]" : "max-h-0"
        } transition-all ease-in-out duration-500`}
      >
        <TodoForm onAdd={handleAddTodo} />
      </div>
      {loading ? (
        <Loading loadingText="Searching..."/>
      ) : (
        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
}
