import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../redux/slicers/auth";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tutores from "../pages/Tutores";
import TutorForm from "../pages/TutorForm";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default function Router() {
  const auth = useSelector(authSelector);

  return (
    <BrowserRouter>
      <Routes>
        {!auth.token ? (
          <Route index element={<Login />} />
        ) : (
          <>
            <Route index element={<Dashboard />} />
            <Route path="/tutores" element={<Tutores />} />
            <Route path="/tutores/novo" element={<TutorForm />} />
            <Route path="/tutores/:id" element={<TutorForm />} />
          </>
        )}
        {/* TODO: remove or improve. being used just for debugging */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
