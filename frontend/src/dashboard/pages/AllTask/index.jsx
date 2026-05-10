import { useEffect, useState } from "react";
import { Users, Filter, Plus, Lock, Star } from "lucide-react";
import KanbanBoard from "./KanbanBoard";
import TaskStats from "./TaskStats";
import { getChecklists, updateChecklist, createChecklist, deleteChecklist } from "../../../services/checklist-ai.service";

const STATUS_MAP = {
    'à faire': 'a-faire',
    'en cours': 'en-cours',
    'terminé': 'terminer',
    // Fallbacks for invalid past data
    'TODO': 'a-faire',
    'IN_PROGRESS': 'en-cours',
    'DONE': 'terminer',
    '': 'a-faire'
};

const REV_STATUS_MAP = {
    'a-faire': 'à faire',
    'en-cours': 'en cours',
    'terminer': 'terminé'
};

const PRIORITY_MAP = {
    'HIGH': 'Maika',
    'MEDIUM': 'Zava-dehibe',
    'LOW': 'Tsotra'
};

export default function AllTask() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await getChecklists();
            const mapped = data.map(t => ({
                id: t.id,
                status: STATUS_MAP[t.status] || 'a-faire',
                priority: PRIORITY_MAP[t.priority] || 'Zava-dehibe',
                tag: "Novokarin'ny IA",
                title: t.title,
                assignees: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
                comments: 0,
                attachments: 0,
                description: t.description
            }));
            setTasks(mapped);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            const backendStatus = REV_STATUS_MAP[newStatus];
            await updateChecklist(taskId, { status: backendStatus });
            setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        } catch (error) {
            console.error("Failed to update task status:", error);
            loadTasks();
        }
    };

    const handleCreateTask = async () => {
        const title = prompt("Inona no asa vaovao?");
        if (!title) return;

        try {
            const newItem = await createChecklist({
                title,
                status: 'à faire',
                priority: 'medium'
            });
            const mapped = {
                id: newItem.id,
                status: STATUS_MAP[newItem.status] || 'a-faire',
                priority: PRIORITY_MAP[newItem.priority] || 'Zava-dehibe',
                tag: "Novokarin'ny IA",
                title: newItem.title,
                assignees: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
                comments: 0,
                attachments: 0,
                description: newItem.description
            };
            setTasks(prev => [mapped, ...prev]);
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm("Tena hovonoina ve ity asa ity?")) return;
        try {
            await deleteChecklist(taskId);
            setTasks(prev => prev.filter(t => t.id !== taskId));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    return (
        <div className="h-full flex flex-col p-6 max-w-[1600px] mx-auto w-full">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-4 font-medium transition-opacity">
                <span>Asa</span>
                <span>/</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Asa rehetra</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fampandrosoana ny vokatra</h1>
                        <Star className="w-6 h-6 text-red-500 fill-red-500" />
                        <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-secondary/20">
                            <Lock className="w-3 h-3" /> MANOKANA
                        </span>
                    </div>
                </div>

                {/* Actions - specific to task */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-gray-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-transparent">
                        <Filter className="w-4 h-4" /> Sivana
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-transparent">
                        <Users className="w-4 h-4" /> Hozaraina
                    </button>
                    <button onClick={handleCreateTask} className="flex items-center gap-2 bg-[#00843D] text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4" /> Asa vaovao
                    </button>
                </div>
            </div>

            <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
                {/* Board */}
                <div className="flex-1 overflow-x-auto pb-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-400 font-medium animate-pulse">Tsidihina ny asa...</span>
                        </div>
                    ) : (
                        <KanbanBoard
                            tasks={tasks}
                            setTasks={setTasks}
                            onStatusChange={handleUpdateTaskStatus}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </div>

                {/* Stats Panel */}
                <div className="hidden min-[1100px]:block shrink-0">
                    {!loading && <TaskStats tasks={tasks} />}
                </div>
            </div>
        </div>
    );
}
