export const initialTasks = [
    {
        id: "t1",
        status: "a-faire",
        priority: "Important",
        tag: "Frontend Development",
        title: "List admin APIs for international pricing by country",
        assignees: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
        comments: 65,
        attachments: 70
    },
    {
        id: "t2",
        status: "a-faire",
        priority: "Urgent",
        tag: "UX Design",
        title: "Web UI kit automation",
        assignees: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
        comments: 51,
        attachments: 57
    },
    {
        id: "t3",
        status: "en-cours",
        priority: "Important and urgent",
        tag: "UX Design",
        title: "Integrate SSL web certificates into onboarding workflow",
        assignees: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
        comments: 52,
        attachments: 56
    },
    {
        id: "t4",
        status: "terminer",
        priority: "Important",
        tag: "UX Writer",
        title: "Maintain consistency in tone, voice, and terminology across the product.",
        assignees: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
        comments: 22,
        attachments: 32
    }
];

export const COLUMNS = [
    { id: "a-faire", title: "HATAO", color: "bg-gray-100 text-gray-700 font-bold border border-gray-200" },
    { id: "en-cours", title: "ANDEHANANA", color: "bg-red-100 text-red-700 font-bold" },
    { id: "terminer", title: "VITA", color: "bg-green-100 text-green-700 font-bold" }
];
