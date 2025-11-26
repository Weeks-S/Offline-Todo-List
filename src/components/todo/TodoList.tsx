import TodoItem  from "./TodoItem";
import type { Todo } from "../../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default function TodoList ({ todos, handleDelete, handleToggle }: TodoListProps) {
  if (!todos.length) return <p className="text-gray-500">No tasks yet.</p>;

  return (
    <ul className="space-y-2 overflow-y-scroll h-96">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} handleToggle={handleToggle}/>
      ))}
    </ul>
  );
};
