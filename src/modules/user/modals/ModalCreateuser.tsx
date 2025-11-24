import React from "react";
import type { UserFormData } from "../../../types/user";

interface ModalCreateUserProps {
  showModal: boolean;
  formData: UserFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: UserFormData) => void;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({
  showModal,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  if (!showModal) return null;

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    onFormDataChange({ 
      ...formData, 
      [field]: value 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
        {/* Header del Modal */}
        <div className="bg-primary p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <i className="bx bx-user-plus mr-3"></i>
              Crear Nuevo Usuario
            </h2>
          </div>
        </div>

        {/* Formulario del Modal */}
        <form onSubmit={onSubmit} className="p-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-user mr-2"></i>
                Nombre completo *
              </label>
              <input
                type="text"
                placeholder="Ingresa el nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-calendar mr-2"></i>
                Edad *
              </label>
              <input
                type="number"
                placeholder="Ingresa la edad"
                value={formData.edad}
                onChange={(e) => handleInputChange("edad", e.target.value)}
                min="1"
                max="120"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-male-female mr-2"></i>
                Género *
              </label>
              <select
                value={formData.genero}
                onChange={(e) => handleInputChange("genero", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-envelope mr-2"></i>
                Correo electrónico *
              </label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                value={formData.gmail}
                onChange={(e) => handleInputChange("gmail", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-cog mr-2"></i>
                Rol del usuario *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              >
                <option value="COLABORADOR">COLABORADOR</option>
                <option value="SECRETARIO">SECRETARIO</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="bx bx-id-card mr-2"></i>
                Credencial *
              </label>
              <input
                type="text"
                placeholder="Ingresa la credencial"
                value={formData.credencial}
                onChange={(e) => handleInputChange("credencial", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Botones del Modal */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <i className="bx bx-save mr-2"></i>
              Crear Usuario
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
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

export default ModalCreateUser;