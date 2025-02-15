export type TaskStatus = "backlog" | "ongoing" | "completed";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}