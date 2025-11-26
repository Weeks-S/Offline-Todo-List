import type { Todo } from "../../types/todo.types";
import { BiX } from "react-icons/bi";

interface TodoItemProps {
  todo: Todo;
  handleToggle: (id:number) => void;
  handleDelete: (id:number) => void;
}

export default function TodoItem({ todo, handleDelete, handleToggle }: TodoItemProps) {

  return (
    <li className="flex items-center justify-between border p-2 rounded gap-4">
      <input
        type="checkbox"
        onClick={() => handleToggle(todo.id)}
        checked={todo.status}
      ></input>
      <div
        className={`flex-1 ${todo.status ? "line-through text-gray-500" : ""}`}
      >
        {todo.name}{" "}
      </div>
      {todo.category && (
        <span className="text-sm text-gray-400">{todo.category}</span>
      )}
      <button
        onClick={() => handleDelete(todo.id)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        <BiX className="w-6 h-6" />
      </button>
    </li>
  );
}
