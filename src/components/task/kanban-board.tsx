import { useEffect, useState } from "react";
import { Column as ColumnType, TaskStatus } from "@/types/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./column";
import { db } from "../../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Task } from "@/types/task";

const initialColumns: ColumnType[] = [
  { id: "backlog", title: "Backlog", tasks: [] },
  { id: "ongoing", title: "Ongoing", tasks: [] },
  { id: "completed", title: "Completed", tasks: [] },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const newColumns = initialColumns.map((col) => ({
        ...col,
        tasks: tasks.filter((task) => task.status === col.id),
      }));

      setColumns(newColumns);
    });

    return () => unsubscribe();
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskRef = doc(db, "tasks", draggableId);
    await updateDoc(taskRef, {
      status: destination.droppableId as TaskStatus,
    });
  };

  const handleAddTask = async (status: TaskStatus, title: string) => {
    await addDoc(collection(db, "tasks"), {
      title,
      status,
      createdAt: Date.now(),
    });
  };

  const handleDeleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleEditTask = async (id: string, newTitle: string) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      title: newTitle,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 h-full overflow-x-auto">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
