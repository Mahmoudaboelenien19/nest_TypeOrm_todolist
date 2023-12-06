export type Todo = {
  title: string;
  description: string;
  finishedAt: Date;
  createdAt: Date;
  category: "work" | "personal" | "shopping" | "study";
  isDone: boolean;
  id: string;
};
