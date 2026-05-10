import { X, Phone, Calendar, Clock, Check } from "lucide-react";
import { format } from "date-fns";

export default function EventSidebar({ event, category, onClose }) {
    return (
        <div className="h-full bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col relative z-20">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="mb-8 pr-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                    Trano malalaka eny Analakely sy Ambohijatovo
                </p>

                {/* Instructor Block */}
                <div className="flex items-start justify-between bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <img src={event.instructor.avatar} alt="instructor" className="w-12 h-12 rounded-xl object-cover shadow-sm bg-white" />
                        <div>
                            <p className="font-bold text-gray-900">{event.instructor.name}</p>
                            <p className="text-xs font-semibold text-gray-400">{event.instructor.role}</p>
                        </div>
                    </div>
                    <button className="bg-white p-2 rounded-lg shadow-sm text-gray-700 hover:text-primary transition-colors border border-gray-100">
                        <Phone className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm font-semibold text-gray-400 flex items-center -mt-4 mb-8">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {event.location}
                </p>

                {/* Date Time Info */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-start gap-4">
                        <Calendar className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-bold text-gray-900">{format(event.date, "dd MMMM, yyyy")}</p>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Daty</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-bold text-gray-900">{event.time}</p>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Ora</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 mt-2">
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                            <Clock className="w-3 h-3" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{event.duration}</p>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Faharetany</p>
                        </div>
                    </div>
                </div>

                {/* Tickets */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Tapakila</h3>
                    <div className="bg-gray-50 flex items-center justify-between p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">{event.price}</p>
                                <p className="text-xs font-semibold text-gray-400">{event.ticketType}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <button className="text-gray-400 hover:text-gray-900 font-bold px-1">-</button>
                            <span className="font-bold text-gray-900">1</span>
                            <button className="text-gray-400 hover:text-gray-900 font-bold px-1">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
                    Hamandrika
                </button>
            </div>
        </div>
    );
}
