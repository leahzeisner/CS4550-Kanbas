import { Navigate, Route, Routes } from "react-router";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Provider } from "react-redux";
import store from "./store";

function Kanbas() {
  return (
    <Provider store={store}>
      <div className="screen-div">
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
