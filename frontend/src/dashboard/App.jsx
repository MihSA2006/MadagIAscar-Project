import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AllTask from "./pages/AllTask/index.jsx";
import Agenda from "./pages/Agenda/index.jsx";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks/*" element={<AllTask />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="*" element={
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Feature Coming Soon</h1>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
