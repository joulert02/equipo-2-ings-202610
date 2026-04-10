import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createFavor } from "../api/favors.js";

const schema = yup.object({
  title:       yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  location:    yup.string().required("La ubicación es obligatoria"),
  reward:      yup.number().positive("Debe ser mayor a 0").required("La recompensa es obligatoria"),
  deadline:    yup.string().optional(),
});

export default function CreateFavorModal({ onClose, onCreated }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  // Valida los datos del formulario usando Yup. Si pasan validaciones, crea el nuevo favor,
  // cierra el modal y actualiza el feed.
  async function onSubmit(data) {
    try {
      const favor = await createFavor(data);
      onCreated(favor);
      onClose();
    } catch (e) {
      alert(e.response?.data?.message || "Error al crear el favor");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-gray-800">Publicar favor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {[
            { name: "title",       label: "Título",              type: "text" },
            { name: "description", label: "Descripción",         type: "text" },
            { name: "location",    label: "Ubicación",           type: "text" },
            { name: "reward",      label: "Recompensa ($)",      type: "number" },
            { name: "deadline",    label: "Fecha límite (opcional)", type: "datetime-local" },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">{label}</label>
              <input
                {...register(name)}
                type={type}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {errors[name] && (
                <span className="text-xs text-red-500">{errors[name].message}</span>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 disabled:opacity-50"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}