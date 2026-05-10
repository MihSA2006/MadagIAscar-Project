import {
    format,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    isSameDay,
    addDays,
    isToday
} from "date-fns";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "../../lib/utils";

export default function CalendarGrid({
    currentDate,
    setCurrentDate,
    events,
    selectedDate,
    onDateClick,
    onEventClick,
    viewMode,
    setViewMode
}) {
    const nextDate = () => {
        if (viewMode === "month") {
            setCurrentDate(addMonths(currentDate, 1));
        } else {
            setCurrentDate(addDays(currentDate, 7));
        }
    };

    const prevDate = () => {
        if (viewMode === "month") {
            setCurrentDate(subMonths(currentDate, 1));
        } else {
            setCurrentDate(addDays(currentDate, -7));
        }
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        onDateClick(today);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {format(currentDate, viewMode === "month" ? "MMMM yyyy" : "'Week of' MMMM dd")}
                    </h2>
                    <div className="flex items-center gap-1 text-primary">
                        <button onClick={prevDate} className="p-1 hover:bg-primary/10 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={nextDate} className="p-1 hover:bg-primary/10 rounded-full transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={goToToday} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm">
                        Today
                    </button>

                    <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
                        <button
                            onClick={() => setViewMode("week")}
                            className={cn(
                                "px-5 py-1.5 rounded-md transition-all",
                                viewMode === "week" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setViewMode("month")}
                            className={cn(
                                "px-5 py-1.5 rounded-md transition-all",
                                viewMode === "month" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            Month
                        </button>
                    </div>

                    <button className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:bg-white transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const weekStartDate = startOfWeek(currentDate, { weekStartsOn: 1 });
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center font-medium text-gray-400 text-sm py-2">
                    {format(addDays(weekStartDate, i), "EEE")}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = viewMode === "month"
            ? startOfWeek(monthStart, { weekStartsOn: 1 })
            : startOfWeek(currentDate, { weekStartsOn: 1 });
        const endDate = viewMode === "month"
            ? endOfWeek(monthEnd, { weekStartsOn: 1 })
            : endOfWeek(currentDate, { weekStartsOn: 1 });

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "dd");
                const cloneDay = day;

                const dayEvents = events.filter(e => isSameDay(e.date, cloneDay));
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentDay = isToday(day);

                days.push(
                    <div
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                        className={cn(
                            viewMode === "month" ? "min-h-[100px]" : "min-h-[400px]",
                            "border border-gray-50 p-2 relative group cursor-pointer transition-all duration-200 rounded-xl m-1 hover:border-gray-200 flex flex-col",
                            viewMode === "month" && !isSameMonth(day, monthStart) ? "text-gray-300 bg-gray-50/50 hover:bg-gray-50" : "bg-white hover:bg-gray-50 hover:shadow-sm",
                            isSelected ? "ring-2 ring-secondary border-transparent bg-secondary/5" : ""
                        )}
                    >
                        <div className="flex justify-end mb-2">
                            <span className={cn(
                                "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full z-10",
                                viewMode === "month" && !isSameMonth(day, monthStart) ? "text-gray-400" : "text-gray-600",
                                isCurrentDay ? "bg-primary text-white" : ""
                            )}>
                                {formattedDate}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-1 z-20">
                            {dayEvents.map((evt) => (
                                <div
                                    key={evt.id}
                                    onClick={(e) => onEventClick(evt, e)}
                                    className="flex flex-col gap-0.5 px-2 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors"
                                >
                                    <span className="text-[11px] font-black text-secondary truncate">{evt.title}</span>
                                    <span className="text-[9px] font-bold text-gray-400">{evt.time}</span>
                                </div>
                            ))}
                        </div>

                        {dayEvents.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <span className="text-secondary/60 text-xl font-bold">+</span>
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} className="grid grid-cols-7 gap-0">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="flex-1 overflow-y-auto pr-2">{rows}</div>;
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative z-10">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
