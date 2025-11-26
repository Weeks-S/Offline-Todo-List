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
  updateTodo,
} from "../services/todo.service";
import { PiPlus } from "react-icons/pi";
import { BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { startLoading, stopLoading } from "../store/slices/uiSlice";
import Loading from "../components/loading/Loading";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Todos Created!",
      icon: "success",
      timer: 800,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    addTodo(name, category);
    setTodos(getTodos());
  };

  const handleToggle = (id: number) => {
    toggleTodo(id);
    setTodos(getTodos());
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this Item?",
      text: "All the deleted items will be permanently deleted!",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Successfully deleted Item!",
          icon: "success",
          timer: 800,
          showConfirmButton: false,
        });
        deleteTodo(id);
        setTodos(getTodos());
      }
      if (result.dismiss || result.isDenied) return;
    });
  };

  const handleEdit = (id: number, updates: Partial<Todo>) => {
    updateTodo(id, updates);
    setTodos(getTodos());
  };

  const handleReorder = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <button
          className={`text-white transition flex ${
            !addForm ? "bg-green-400" : "bg-red-400"
          } px-4 py-2 rounded-2xl mb-4 transition-colors duration-300 cursor-pointer`}
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
          } px-4 py-2 rounded-2xl mb-4 transition-colors duration-300 cursor-pointer`}
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
        } transition-all ease-in-out duration-500 mb-4 flex items-start justify-between`}
      >
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border py-1 px-2 mb-2 rounded-2xl w-full"
        />
        <div className="flex flex-col items-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border py-1 px-2 mb-2 rounded-2xl"
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
            className="border py-1 px-2 mb-2 rounded-2xl"
          >
            <option value="All">All Categories</option>
            <option value="Career">Career</option>
            <option value="Development">Development</option>
            <option value="Learning">Learning</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
        </div>
      </div>
      <div
        className={`overflow-hidden ${
          addForm ? "max-h-[200px]" : "max-h-0"
        } transition-all ease-in-out duration-500`}
      >
        <TodoForm onAdd={handleAddTodo} />
      </div>
      {loading ? (
        <Loading loadingText="Searching..." />
      ) : (
        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
          handleReorder={handleReorder}
        />
      )}
    </div>
  );
}
