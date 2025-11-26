export interface Todo {
  id: number;
  name: string;
  category: category | undefined;
  status: boolean;
}

export type category =
  | "Personal"
  | "Work"
  | "Development"
  | "Learning"
  | "Career";
