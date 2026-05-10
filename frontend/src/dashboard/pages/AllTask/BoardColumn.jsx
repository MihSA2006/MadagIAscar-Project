import { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

export default function BoardColumn({ column, tasks, onDelete }) {
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex flex-col w-[350px] min-w-[320px] rounded-xl transition-colors",
                isOver ? "bg-gray-100" : ""
            )}
        >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <span className={cn("px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap", column.color)}>
                        {column.title}
                    </span>
                    <span className="text-gray-500 font-semibold px-2">{tasks.length}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <button className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Task List Container */}
            <div className="flex-1 flex flex-col gap-3 min-h-[150px] pb-4">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={onDelete} />
                    ))}
                </SortableContext>

                {/* Empty state additive button */}
                <button className="mt-2 w-full py-3 flex items-center justify-center gap-2 text-gray-500 font-medium hover:bg-white hover:shadow-sm rounded-xl border border-dashed border-gray-300 hover:border-gray-400 transition-all">
                    <Plus className="w-4 h-4" /> Add Card
                </button>
            </div>
        </div>
    );
}
