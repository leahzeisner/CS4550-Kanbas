import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";

function Kanbas() {
  return (
    <div className="d-flex">
      <KanbasNavigation />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses/*" element={<h1>Courses</h1>} />
        </Routes>
      </div>
    </div>
  );
}
export default Kanbas;
