import TodoItem from "./TodoItem";
import type { Todo } from "../../types/todo.types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface TodoListProps {
  todos: Todo[];
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, update: Partial<Todo>) => void;
  handleReorder: (newTodos: Todo[]) => void;
}

export default function TodoList({
  todos,
  handleDelete,
  handleToggle,
  handleEdit,
  handleReorder,
}: TodoListProps) {
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    const reordered = [...todos];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    handleReorder(reordered);
  };

  if (!todos.length) return <p className="text-gray-500">No tasks yet.</p>;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2 overflow-y-scroll h-96">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
