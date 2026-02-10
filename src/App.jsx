import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import PersonaBuilder from "./pages/PersonaBuilder";
import PersonaDetails from "./pages/PersonaDetails";
import DocumentUpload from "./components/document-upload";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardPersonas from "./pages/DashboardPersonas";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/navbar";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    let finished = false;

    const timeout = setTimeout(() => {
      if (!finished) {
        console.warn("Auth check timed out — forcing stop");
        useUserStore.setState({ checkingAuth: false, user: null });
      }
    }, 100); // 8 seconds

    checkAuth().finally(() => {
      finished = true;
      clearTimeout(timeout);
    });
  }, [checkAuth]);

  if (checkingAuth) return <div>Loading.....</div>;
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/*" element={<Home />} />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/person-generator"
            element={user ? <PersonaBuilder /> : <Navigate to="/login" />}
          />

          <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" /> }>
            <Route index element={user ? <DashboardOverview /> : <Navigate to="/login" /> } />
            <Route path="insights" element={ user ? <DashboardPersonas /> : <Navigate to="/login" /> } />
            {/* <Route path="surveys" element={<DashboardSurveys />} />
              <Route path="campaigns" element={<DashboardCampaigns />} /> */}

            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route
            path="/upload"
            element={<DocumentUpload onBack={() => window.history.back()} />}
          />
          <Route path="/personas/:id" element={user ? <PersonaDetails /> : <Navigate to="/login" /> } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
      <Footer />
    </>
  );
}

export default App;
