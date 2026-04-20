import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerApi } from "../api/auth.js";

const schema = yup.object({
  phone: yup
    .string()
    .required("Ingresa tu teléfono")
    .matches(/^3\d{9}$/, "Debe ser un celular de 10 dígitos (empieza en 3)"),
  password: yup
    .string()
    .required("Ingresa una contraseña")
    .min(8, "Mínimo 8 caracteres"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues: { phone: "", password: "" } });

  async function onSubmit(values) {
    setServerError("");
    try {
      await registerApi({ phone: values.phone.trim(), password: values.password });
      navigate("/login", { state: { registered: true } });
    } catch (e) {
      setServerError(e.response?.data?.message || "No se pudo completar el registro");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-1">Crear cuenta</h1>
        <p className="text-sm text-gray-500 text-center mb-6">FavUPB</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{serverError}</p>
          )}

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-1">
              Celular
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="3001234567"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-emerald-600 disabled:opacity-60"
          >
            {isSubmitting ? "Registrando…" : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
