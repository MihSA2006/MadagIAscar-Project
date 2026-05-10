import { PieChart, CheckCircle2, Clock, ListFilter, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export default function TaskStats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "terminer").length;
    const inProgress = tasks.filter(t => t.status === "en-cours").length;
    const toDo = tasks.filter(t => t.status === "a-faire").length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const StatItem = ({ icon: Icon, label, value, color, delay }) => (
        <div
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-xl", color)}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
        </div>
    );

    return (
        <div className="w-full lg:w-72 flex flex-col gap-6 flex-shrink-0 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100">
            <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-gray-900 text-lg">Fintin'isa haingana</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
            </div>

            <div className="flex flex-col gap-4">
                {/* Progress Circle Mockup */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                    <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="10"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="10"
                                fill="transparent"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 - (251.2 * completionRate) / 100}
                                className="text-primary transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-gray-900">{completionRate}%</span>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Asa vita</p>
                    <p className="text-xs text-gray-400 mt-1">Ny fikirizana no lakile!</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <StatItem
                        icon={ListFilter}
                        label="Isan'ny asa rehetra"
                        value={total}
                        color="bg-green-50 text-primary"
                        delay={100}
                    />
                    <StatItem
                        icon={Clock}
                        label="Andehanana"
                        value={inProgress}
                        color="bg-green-50 text-primary"
                        delay={200}
                    />
                    <StatItem
                        icon={CheckCircle2}
                        label="Vita"
                        value={completed}
                        color="bg-red-50 text-red-500"
                        delay={300}
                    />
                    <StatItem
                        icon={AlertCircle}
                        label="Hatao"
                        value={toDo}
                        color="bg-gray-50 text-gray-500"
                        delay={400}
                    />
                </div>
            </div>

            {/* Suggestion Card */}
            <div className="mt-auto bg-primary p-5 rounded-[2rem] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <p className="font-black text-sm mb-2">Torohevitra mahasoa 💡</p>
                <p className="text-xs text-white/80 leading-relaxed font-medium">Tazony latsaky ny 3 ny asa 'Andehanana' mba hifantohana tsara!</p>
            </div>
        </div>
    );
}
