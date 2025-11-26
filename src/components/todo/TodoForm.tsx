import { useForm } from "react-hook-form";
import type { category } from "../../types/todo.types";

interface TodoFormProps {
  onAdd: (name: string, category?: category) => void;
}

interface TodoFormValues {
  name: string;
  category: category;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    defaultValues: {
      name: "",
      category: "Career",
    },
  });

  const onSubmit = (data: TodoFormValues) => {
    onAdd(data.name, data.category);
    reset({ name: "", category: "Career" }); // reset back to defaults
  };

  const categories: category[] = [
    "Career",
    "Development",
    "Learning",
    "Personal",
    "Work",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 mb-4">
      <div className="flex-1 gap-2 sm:flex">
        <input
          type="text"
          placeholder="Add a task..."
          {...register("name", { required: "Title is required" })}
          className="border p-2 w-full"
        />

        <select
          {...register("category")}
          className="border-slate-400 border rounded-2xl"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Add
        </button>
      </div>

      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
    </form>
  );
}
