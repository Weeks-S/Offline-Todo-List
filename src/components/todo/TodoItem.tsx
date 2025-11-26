import { useState } from "react";
import type { Todo } from "../../types/todo.types";
import { BiX } from "react-icons/bi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

interface TodoItemProps {
  todo: Todo;
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, updates: Partial<Todo>) => void;
}

export default function TodoItem({
  todo,
  handleDelete,
  handleToggle,
  handleEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const saveEdit = () => {
    handleEdit(todo.id, { name: newName });
    setIsEditing(false);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between border py-1 px-2 rounded gap-4 ${
        todo.status ? "bg-green-400/20" : ""
      }`}
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600 h-full"
      >
        <MdDragIndicator className="w-6 h-6" />
      </span>

      {isEditing ? (
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-1 flex-1 mr-2"
        />
      ) : (
        <>
          <input
            type="checkbox"
            onChange={() => handleToggle(todo.id)}
            checked={todo.status}
          ></input>
          <div
            className={`flex-1 font-semibold ${
              todo.status ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.name}
          </div>
          {todo.category && (
            <span className="text-sm text-gray-400">{todo.category}</span>
          )}
        </>
      )}
      {isEditing ? (
        <button
          onClick={saveEdit}
          className="bg-green-500 hover:bg-green-700 ml-2 text-white px-4 py-1 rounded-2xl cursor-pointer"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white ml-2 px-4 py-1 rounded-2xl cursor-pointer"
        >
          Edit
        </button>
      )}
      <button
        onClick={() => (isEditing ? cancelEdit() : handleDelete(todo.id))}
        className="bg-red-500 hover:bg-red-700 cursor-pointer text-white rounded-full p-1"
      >
        <BiX className="w-6 h-6" />
      </button>
    </li>
  );
}
