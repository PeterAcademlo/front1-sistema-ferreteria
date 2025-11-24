import React, { useState } from "react";
import { userService } from "../../../api/api";

interface ModalVentasProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface LoginForm {
  gmail: string;
  credencial: string;
}

const ModalVentas: React.FC<ModalVentasProps> = ({
  showModal,
  onClose,
}) => {
  const [formData, setFormData] = useState<LoginForm>({
    gmail: "",
    credencial: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!showModal) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await userService.login(formData.gmail, formData.credencial);
      const user = result.user;
      console.log("📨 Respuesta del backend:", result);
      console.log("👤 Usuario autenticado:", user);
      console.log("🎫 Token recibido:", result.token);

      if (user.role !== "COLABORADOR" && user.role !== "ADMIN") {
        throw new Error(
          "No tienes permisos para acceder al módulo de ventas. Se requiere rol COLABORADOR o ADMIN"
        );
      }

      console.log(` Login exitoso como ${user.role}:`, user.nombre);

      // 🔑 Redirigir al Front de Ventas pasando el token como query param
      const token = result.token;
      const ventasUrl = `${import.meta.env.VITE_FRONT_URL}/ventas?token=${token}`;
      console.log(" Redirigiendo a Módulo de Ventas con token:", ventasUrl);

      window.location.href = ventasUrl;

      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(" Error en autenticación:", err);
      setError(err.message || "Error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header del Modal */}
        <div className="bg-primary p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <i className="bx bx-cart-alt mr-3"></i>
              Ventas
            </h2>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center">
            <i className="bx bx-error-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Formulario del Modal */}
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-envelope mr-2"></i>
                Email
              </label>
              <input
                type="email"
                name="gmail"
                placeholder="Ingresa tu email"
                value={formData.gmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-lock-alt mr-2"></i>
                Contraseña
              </label>
              <input
                type="password"
                name="credencial"
                placeholder="Ingresa tu contraseña"
                value={formData.credencial}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Botones del Modal */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin mr-2"></i>
                  Verificando...
                </>
              ) : (
                <>
                  <i className="bx bx-log-in mr-2"></i>
                  Ingresar
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            >
              <i className="bx bx-x mr-2"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalVentas;