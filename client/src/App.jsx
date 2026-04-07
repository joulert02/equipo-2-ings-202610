import { Routes, Route, Navigate } from "react-router-dom";
import FeedPage from "./pages/FeedPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
}