import { Droppable } from "react-beautiful-dnd";
import { Column as ColumnType, Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./task-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ColumnProps {
  column: ColumnType;
  onAddTask: (status: ColumnType["id"], title: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
}

export function Column({
  column,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: ColumnProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle);
      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg p-4 min-w-[300px]">
      <h2 className="text-lg font-semibold mb-4 capitalize">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1"
          >
            {column.tasks.map((task: Task, index: number) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isAddingTask ? (
        <div className="mt-3 space-y-2">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddTask}>
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          className="mt-3"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      )}
    </div>
  );
}