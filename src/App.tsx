import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./modules/vista-principal/layout/HomePage";

import { useEffect, useState } from "react";
import UserManager from "./modules/user/layout/UserManager";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (token && userStr) {
          const user = JSON.parse(userStr);
          setIsAdmin(user.role === "ADMIN");
        }
      } catch (error) {
        console.error("Error verificando admin:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary">
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Homepage />} />

          {/* Ruta protegida - Solo ADMIN */}
          <Route
            path="/usermanager"
            element={
              <ProtectedRoute>
                <UserManager onBack={function (): void {
                  throw new Error("Function not implemented.");
                } } />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
