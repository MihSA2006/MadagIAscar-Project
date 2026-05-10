import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto bg-white bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,_rgba(0,132,61,0.10)_0%,_rgba(252,210,210,0.24)_45%,_transparent_82%)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
