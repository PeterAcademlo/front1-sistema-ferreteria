import React from "react";
import Alert from "../../../components/Alert";

// 👇 ACTUALIZA los tipos para que coincidan con useUsers
interface CustomAlert {
  type: "success" | "danger";
  message: string;
}

interface ModalDeleteUserProps {
  userToDelete: { id: number; nombre: string } | null;
  customAlert: CustomAlert | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({
  userToDelete,
  customAlert,
  onConfirm,
  onCancel,
}) => {
  if (!userToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header del Modal */}
        <div className="bg-linear-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <i className="bx bx-trash mr-3"></i>
              Confirmar Eliminación
            </h2>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-8">
          <div className="text-center mb-6">
            <i className="bx bx-error text-6xl text-red-500 mb-4"></i>
            <p className="text-lg text-gray-700">
              ¿Estás seguro de eliminar al usuario?
            </p>
            <p className="text-xl font-bold text-primary mt-2">
              {userToDelete.nombre}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Esta acción no se puede deshacer
            </p>
          </div>

          {/* Botones del Modal */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <i className="bx bx-trash mr-2"></i>
              Sí, Eliminar
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              <i className="bx bx-x mr-2"></i>
              Cancelar
            </button>
          </div>
        </div>

          {customAlert && (
          <Alert type={customAlert.type} message={customAlert.message} />
        )}
      </div>
    </div>
  );
};

export default ModalDeleteUser;