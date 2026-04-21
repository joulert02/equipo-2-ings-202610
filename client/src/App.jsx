import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import FeedPage from "./pages/FeedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RootRedirect from "./components/RootRedirect.jsx";
import MyFavorsPage from "./pages/MyFavorsPage.jsx";

export default function App() {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (

    <>
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
          <Link to="/feed"      className="flex-1 py-3 text-center text-sm text-gray-600 hover:text-emerald-600">🏠 Feed</Link>
          <Link to="/my-favors" className="flex-1 py-3 text-center text-sm text-gray-600 hover:text-emerald-600">⭐ Mis favores</Link>
        </nav>
      )}

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<RootRedirect />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/my-favors" element={<MyFavorsPage />} />
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
    </>
  );
}