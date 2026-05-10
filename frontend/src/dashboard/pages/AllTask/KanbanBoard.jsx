import { useState } from "react";
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { initialTasks, COLUMNS } from "./data";
import BoardColumn from "./BoardColumn";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks, setTasks, onStatusChange, onDelete }) {
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";
        const isOverColumn = over.data.current?.type === "Column";

        if (!isActiveTask) return;

        // Dropping a task over another task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].status !== tasks[overIndex].status) {
                    const newTasks = [...tasks];
                    const newStatus = tasks[overIndex].status;
                    newTasks[activeIndex].status = newStatus;

                    // Persist to backend
                    onStatusChange?.(activeId, newStatus);

                    return arrayMove(newTasks, activeIndex, overIndex);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = isOverColumn;

        // Dropping a task over an empty column area
        if (isActiveTask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const currentStatus = tasks[activeIndex].status;

                if (currentStatus !== overId) {
                    const newTasks = [...tasks];
                    newTasks[activeIndex].status = overId;

                    // Persist to backend
                    onStatusChange?.(activeId, overId);

                    return arrayMove(newTasks, activeIndex, activeIndex);
                }

                return tasks;
            });
        }
    };

    const handleDragEnd = (event) => {
        setActiveTask(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 h-full items-start">
                {COLUMNS.map((col) => (
                    <BoardColumn
                        key={col.id}
                        column={col}
                        tasks={tasks.filter(t => t.status === col.id)}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
