export interface Todo {
  id: number;
  name: string;
  category: category[];
  status: boolean;
}

export type category =
  | "Personal"
  | "Work"
  | "Development"
  | "Learning"
  | "Career";
