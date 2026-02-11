import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import PersonaBuilder from "./pages/PersonaBuilder";
import PersonaDetails from "./pages/PersonaDetails";
import DocumentUpload from "./components/document-upload";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardPersonas from "./pages/DashboardPersonas";

function App() {
  const user = useUserStore((s) => s.user);
  const checkAuth = useUserStore((s) => s.checkAuth);
  const checkingAuth = useUserStore((s) => s.checkingAuth);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Optional timeout safety (8s)
      const timeoutId = setTimeout(() => {
        if (!cancelled) {
          console.warn("Auth check timed out");
          // just stop spinner; user stays null
          useUserStore.setState({ checkingAuth: false });
        }
      }, 8000);

      try {
        await checkAuth();
      } finally {
        clearTimeout(timeoutId);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [checkAuth]);

  if (checkingAuth) return <div>Loading.....</div>;

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* protected */}
          <Route
            path="/person-generator"
            element={user ? <PersonaBuilder /> : <Navigate to="/login" />}
          />

          <Route
            path="/dashboard"
            element={user ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<DashboardOverview />} />
            <Route path="insights" element={<DashboardPersonas />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route
            path="/upload"
            element={
              user ? (
                <DocumentUpload onBack={() => window.history.back()} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/personas/:id"
            element={user ? <PersonaDetails /> : <Navigate to="/login" />}
          />

          {/* 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
      <Footer />
    </>
  );
}

export default App;