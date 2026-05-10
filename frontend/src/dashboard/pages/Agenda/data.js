import { addDays, startOfMonth } from 'date-fns';

const today = new Date();
const monthStart = startOfMonth(today);

export const initialEvents = [
    {
        id: 'e1',
        title: 'Guitar lesson',
        date: addDays(monthStart, 3), // around 4th
        time: '09:00 - 09:45',
        duration: '45 min',
        instructor: { name: 'Brandon Russell', role: 'Instructor', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        location: '834 Boyer Shore Suite 076',
        price: '50 PLN',
        ticketType: 'Regular ticket',
    },
    {
        id: 'e2',
        title: 'Kayaking',
        date: addDays(monthStart, 5), // 6th
        time: '14:00 - 15:30',
        duration: '1h 30 min',
        instructor: { name: 'Sarah Waters', role: 'Guide', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        location: 'River Base Camp',
        price: '120 PLN',
        ticketType: 'Equipment included',
    },
    {
        id: 'e3',
        title: 'Rytmic',
        date: addDays(monthStart, 8),
        time: '18:00 - 19:00',
        duration: '60 min',
        instructor: { name: 'Anna Bella', role: 'Coach', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        location: 'Studio A',
        price: '40 PLN',
        ticketType: 'Drop-in',
    },
    {
        id: 'e4',
        title: 'Zumba dance',
        date: addDays(monthStart, 13),
        time: '19:00 - 20:00',
        duration: '60 min',
        instructor: { name: 'Anna Bella', role: 'Coach', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        location: 'Studio A',
        price: '40 PLN',
        ticketType: 'Drop-in',
    },
    {
        id: 'e5',
        title: 'Guitar lesson',
        date: addDays(monthStart, 16),
        time: '09:00 - 09:45',
        duration: '45 min',
        instructor: { name: 'Brandon Russell', role: 'Instructor', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        location: '834 Boyer Shore Suite 076',
        price: '50 PLN',
        ticketType: 'Regular ticket',
    },
];
