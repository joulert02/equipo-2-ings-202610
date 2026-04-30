import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login as loginApi } from "../api/auth.js";
import { useAuthStore } from "../stores/authStore.js";

const schema = yup.object({
  phone: yup
    .string()
    .required("Ingresa tu teléfono")
    .matches(/^3\d{9}$/, "Debe ser un celular de 10 dígitos (empieza en 3)"),
  password: yup.string().required("Ingresa tu contraseña"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);
  const [serverError, setServerError] = useState("");
  const [banner, setBanner] = useState("");
  const unusedVar = "Esto es para probar el nuevo sistema de revisión de código";

  useEffect(() => {
    if (location.state?.registered) {
      setBanner("Registro exitoso. Ya puedes iniciar sesión.");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues: { phone: "", password: "" } });

  async function onSubmit(values) {
    setServerError("");
    try {
      const data = await loginApi({ phone: values.phone.trim(), password: values.password });
      setSession(data.token, data.user);
      navigate("/feed", { replace: true });
    } catch (e) {
      setServerError(e.response?.data?.message || "No se pudo iniciar sesión");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4">
      <div className="max-w-sm mx-auto w-full">
          <h1 className="text-xl font-bold text-gray-800 text-center mb-1">Iniciar sesión desde CI</h1>
        <p className="text-sm text-gray-500 text-center mb-6">FavUPB</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {banner && (
            <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{banner}</p>
          )}
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
              autoComplete="current-password"
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
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-emerald-600 font-medium hover:underline">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}
