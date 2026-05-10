import { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import CalendarGrid from "./CalendarGrid";
import EventSidebar from "./EventSidebar";
import AddEventModal from "./AddEventModal";
import { Calendar as CalendarIcon } from "lucide-react";
import { fetchAgendaEvents, createAgendaEvent } from "../../../services/agenda.service";

export default function Agenda() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [viewMode, setViewMode] = useState("month");

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);

    const mapToFrontendEvent = (apiEvent) => {
        const startDateObj = new Date(apiEvent.startDate);
        const endDateObj = new Date(apiEvent.endDate);

        const timeStr = `${format(startDateObj, "HH:mm")} - ${format(endDateObj, "HH:mm")}`;
        const diffMs = endDateObj - startDateObj;
        const durationHours = Math.round(diffMs / (1000 * 60 * 60));

        return {
            id: apiEvent.id,
            title: apiEvent.title,
            date: startDateObj,
            time: timeStr,
            duration: `${durationHours || 1} h`,
            description: apiEvent.description || "",
            // fallback mock info
            instructor: { name: 'Self', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            price: 'Free',
            ticketType: 'Personal',
        };
    };

    const loadEvents = async () => {
        try {
            const data = await fetchAgendaEvents();
            if (Array.isArray(data)) {
                setEvents(data.map(mapToFrontendEvent));
            }
        } catch (error) {
            console.error("Failed to load agenda events:", error);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);

        // Check if there are events on this date
        const dayEvents = events.filter(e => isSameDay(e.date, date));

        if (dayEvents.length > 0) {
            setSelectedEvent(dayEvents[0]);
        } else {
            setSelectedEvent(null);
            setIsModalOpen(true);
        }
    };

    const handleEventClick = (event, e) => {
        e.stopPropagation(); // prevent date click from firing
        setSelectedDate(event.date);
        setSelectedEvent(event);
    };

    const handleAddEvent = async (newEventData) => {
        try {
            const [startStr, endStr] = (newEventData.time || "12:00 - 13:00").split(" - ");
            const [startH, startM] = (startStr || "12:00").split(":");
            const [endH, endM] = (endStr || "13:00").split(":");

            const startDate = new Date(selectedDate);
            startDate.setHours(parseInt(startH || 12), parseInt(startM || 0), 0, 0);

            const endDate = new Date(selectedDate);
            endDate.setHours(parseInt(endH || 13), parseInt(endM || 0), 0, 0);

            const payload = {
                title: newEventData.title || "Nouvel évènement",
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                description: "",
                category: "General",
                location: "Bureau"
            };

            const createdApiEvent = await createAgendaEvent(payload);
            const formatted = mapToFrontendEvent(createdApiEvent);

            setEvents(prev => [...prev, formatted]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save event:", error);
            alert("Erreur lors de la sauvegarde de l'évènement");
        }
    };

    return (
        <div className="h-full flex flex-col p-6 max-w-[1600px] mx-auto w-full relative overflow-hidden  rounded-xl">
            {/* Breadcrumb / Slug */}
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-2 font-medium">
                <span>Agenda</span>
                <span>/</span>
                <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> Planning</span>
            </div>

            <div className="flex flex-1 min-h-0 relative">
                {/* Left Side: Calendar Grid */}
                <div className={`flex-1 transition-all duration-300 ${selectedEvent ? 'pr-8 border-r border-gray-100 mr-8' : ''} flex flex-col`}>
                    <CalendarGrid
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        events={events}
                        selectedDate={selectedDate}
                        onDateClick={handleDateClick}
                        onEventClick={handleEventClick}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </div>

                {/* Right Side: Event Sidebar Details */}
                {selectedEvent && (
                    <div className="w-[400px] flex-shrink-0 animate-in slide-in-from-right-8 duration-300 fade-in overflow-y-auto">
                        <EventSidebar
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                        />
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AddEventModal
                    selectedDate={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddEvent}
                />
            )}
        </div>
    );
}
