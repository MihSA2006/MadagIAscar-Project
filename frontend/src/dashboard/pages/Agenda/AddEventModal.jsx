import { useState } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

export default function AddEventModal({ selectedDate, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        onSave({ title, time: time || "12:00 - 13:00", duration: duration || "1 h" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-8 border-b border-gray-50 bg-gray-50/30">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Fandaharana vaovao</h2>
                        <div className="flex items-center gap-2 mt-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{format(selectedDate, "dd MMMM, yyyy")}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2.5 hover:bg-white hover:shadow-md bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider ml-1">Anaran'ny hetsika</label>
                        <input
                            type="text"
                            required
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-900 bg-gray-50/50 hover:bg-white"
                            placeholder="oh. Fivoriana"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider ml-1">Ora</label>
                            <input
                                type="text"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-900 bg-gray-50/50 hover:bg-white"
                                placeholder="10:00 - 11:00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider ml-1">Faharetany</label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-900 bg-gray-50/50 hover:bg-white"
                                placeholder="1 h"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                        <button type="submit" className="w-full py-4 rounded-2xl font-black bg-primary text-white hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                            Hamorona fandaharana
                        </button>
                        <button type="button" onClick={onClose} className="w-full py-4 rounded-2xl font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all text-sm">
                            Hanafoana
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
