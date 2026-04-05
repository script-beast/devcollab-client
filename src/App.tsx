// import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router";

import "react-toastify/ReactToastify.css";
import "./App.css";

import Login from "./screen/Login";
import Register from "./screen/Register";

import AppLayout from "./layouts/AppLayout";
import BoardPage from "./pages/BoardPage";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";
import LandingPage from "./pages/LandingPage";
import LabelsPage from "./pages/LabelsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./contexts/AuthContext";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicOnly = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/projects" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnly>
              <Register />
            </PublicOnly>
          }
        />
        <Route
          element={
            <AuthGate>
              <AppLayout />
            </AuthGate>
          }
        >
          <Route path="/projects" element={<DashboardPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/labels" element={<LabelsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Backdrop
        id="backdropLoader"
        sx={{ color: "#fff", zIndex: () => 99999999999 }}
        open={false}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Backdrop>
      <ToastContainer />
    </>
  );
}

export default App;
