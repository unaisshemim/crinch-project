import { KanbanBoard } from "@/components/task/kanban-board";

export default function TaskAssign() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">
          Operation: Get Your Friend Back
        </h1>
        <KanbanBoard />
      </div>
    </main>
  );
}
