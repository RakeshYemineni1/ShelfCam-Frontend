import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import StoreView from "./pages/StoreView";
import Alerts from "./pages/Alerts";
import ShelfView from "./pages/shelfView";
import ManageWorkers from "./pages/ManageWorkers";
import WorkerAlerts from "./WorkerAlerts";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes inside Layout (with sidebar + main) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/store/:id" element={<StoreView />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/manage-workers" element={<ManageWorkers />} />
        <Route path="/store/:id/shelf/:shelfId" element={<ShelfView />} />
        <Route path="/my-alerts" element={<WorkerAlerts />} /> {/* <-- Move this inside */}
      </Route>
    </Routes>
  );
}

export default App;
