import { useEffect, useState } from "react";
import { getFavors, cancelFavor, completeFavor } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";

export default function FeedPage() {
  
 const [favors, setFavors]       = useState([]);
 const [loading, setLoading]     = useState(true);
 const [showModal, setShowModal] = useState(false);
 useEffect(() => { loadFavors(); }, []);
 async function loadFavors() {
   setLoading(true);
   try {
     setFavors(await getFavors());
   } catch {
     alert("No se pudieron cargar los favores");
   } finally {
     setLoading(false);
   }
 }
 async function handleCancel(id) {
   if (!confirm("¿Cancelar esta solicitud?")) return;
   try {
     await cancelFavor(id);
     setFavors((prev) => prev.filter((f) => f.id !== id));
   } catch (e) {
     alert(e.response?.data?.message || "Error al cancelar");
   }
 }
 // Marca un favor como completado y lo elimina del feed.
 async function handleComplete(id) {
   if (!confirm("¿Marcar este favor como completado?")) return;
   try {
     await completeFavor(id);
     setFavors((prev) => prev.filter((f) => f.id !== id));
   } catch (e) {
     alert(e.response?.data?.message || "Error al completar");
   }
 }
 return (
<div className="min-h-screen bg-gray-50">
<header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
<h1 className="font-bold text-gray-800 text-lg">FavUPB</h1>
<button
         onClick={() => setShowModal(true)}
         className="bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-600"
>
         + Publicar favor
</button>
</header>
<main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
       {loading && (
<p className="text-center text-gray-400 text-sm">Cargando favores...</p>
       )}
       {!loading && favors.length === 0 && (
<p className="text-center text-gray-400 text-sm mt-12">
           No hay favores disponibles aún.<br />¡Sé el primero en publicar uno!
</p>
       )}
       {favors.map((favor) => (
<FavorCard key={favor.id} favor={favor} onCancel={handleCancel} onComplete={handleComplete} />
       ))}
</main>
     {showModal && (
<CreateFavorModal
         onClose={() => setShowModal(false)}
         onCreated={(newFavor) => setFavors((prev) => [newFavor, ...prev])}
       />
     )}
</div>
 );
}