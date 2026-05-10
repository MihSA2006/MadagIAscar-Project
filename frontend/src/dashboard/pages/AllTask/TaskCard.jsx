import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, Paperclip, Flame, Clock, Zap, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";

// Helper for priority badges
const PriorityBadge = ({ priority }) => {
    let colorClass = "text-gray-500 bg-gray-100";
    let Icon = null;

    if (priority === "Zava-dehibe") {
        colorClass = "text-primary bg-green-50";
        Icon = Flame;
    } else if (priority === "Maika") {
        colorClass = "text-red-600 bg-red-50";
        Icon = Zap;
    } else if (priority === "Zava-dehibe sy maika") {
        colorClass = "text-red-600 bg-red-100";
        Icon = Flame;
    }

    return (
        <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1", colorClass)}>
            {Icon && <Icon className="w-3 h-3" />}
            {priority}
        </span>
    );
};

export default function TaskCard({ task, onDelete }) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white border-2 border-primary/40 -rotate-2 scale-105 opacity-80 min-h-[120px] rounded-2xl shadow-xl flex flex-col p-4 w-full"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing w-full group relative"
            )}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(task.id);
                }}
                className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-50"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="flex flex-wrap gap-2 mb-3">
                <PriorityBadge priority={task.priority} />
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold text-[#1f3b22]/70 bg-green-50">
                    {task.tag}
                </span>
            </div>

            <h3 className="font-semibold text-gray-800 leading-snug mb-4">{task.title}</h3>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                {/* Avatars */}
                <div className="flex items-center -space-x-2">
                    {task.assignees.map((avatar, i) => (
                        <img
                            key={i}
                            src={avatar}
                            alt="assignee"
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        />
                    ))}
                </div>

                {/* Action Counters */}
                <div className="flex items-center gap-3 text-gray-400 text-xs font-semibold">
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> <span>{task.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Paperclip className="w-3.5 h-3.5" /> <span>{task.attachments}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
