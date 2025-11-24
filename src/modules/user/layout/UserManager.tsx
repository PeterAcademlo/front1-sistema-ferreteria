import React from "react";

import ModalUpdateUser from "../modals/ModalUpdateUser";
import ModalDeleteUser from "../modals/ModalDeleteUser";
import type { User, UserFormData } from "../../../types/user";
import ModalCreateUser from "../modals/ModalCreateuser";
import { useUsers } from "../../../hooks/useUsers";

interface UserManagerProps {
  onBack: () => void;
}

const UserManager: React.FC<UserManagerProps> = ({ onBack }) => {
  const {
    users,
    loading,
    formData,
    customAlert,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
  } = useUsers();

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<{
    id: number;
    nombre: string;
  } | null>(null);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetForm();
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    resetForm();
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      closeCreateModal();
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      closeUpdateModal();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  const handleDeleteClick = (id: number, nombre: string) => {
    setUserToDelete({ id, nombre });
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDelete(userToDelete.id);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const handleEditClick = (user: User) => {
    handleEdit(user);
    openUpdateModal();
  };

  const handleFormDataChange = (newData: UserFormData) => {
    setFormData(newData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="inline-flex items-center justify-center mb-4 p-4 w-full bg-primary rounded-2xl relative">
          <button
            onClick={onBack}
            className="absolute left-6 bg-white text-primary hover:bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
            title="Volver al inicio"
          >
            <i className="bx bx-arrow-back text-2xl"></i>
          </button>

          <div className="bg-primary rounded-full w-14 h-14 flex justify-center items-center border-white border-2 mr-4">
            <i className="bx bx-store-alt text-3xl text-white"></i>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mt-1">
              TecnoMarket S.A.C
            </h1>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        {/* Botón Crear Usuario */}
        <div className="text-center mb-8">
          <button
            onClick={openCreateModal}
            className="bg-primary hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto text-lg"
          >
            <i className="bx bx-plus-circle text-2xl mr-2"></i>
            Crear Nuevo Usuario
          </button>
        </div>

        {/* Lista de usuarios */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <i className="bx bx-list-ul mr-3"></i>
              Lista de Usuarios
            </h2>

            <span className="bg-accent text-primary px-4 py-2 rounded-full font-semibold">
              {users.filter((user) => user.id !== 1).length} usuarios{" "}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <i className="bx bx-loader-alt bx-spin text-4xl text-primary mb-4"></i>
              <p className="text-gray-600 text-xl">Cargando usuarios...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              {/* Header de la tabla */}
              <div className="bg-linear-to-r from-primary to-green-600 text-white grid grid-cols-7 gap-2">
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Nombre
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Edad
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Género
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Gmail
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Role
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Credencial
                </div>
                <div className="p-2 py-4 text-center font-semibold text-sm">
                  Acciones
                </div>
              </div>

              <div className="h-70 3xl:h-120 overflow-y-auto">
                {users
                  .filter((user) => user.id !== 1)
                  .map((user: User, index: number) => (
                    <div
                      key={`${user.id}-${index}`}
                      className={`grid grid-cols-7 gap-2 border-b hover:bg-green-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="p-2 py-5 text-center font-medium text-gray-800 text-sm truncate">
                        {user.nombre}
                      </div>
                      <div className="p-2 py-5 text-center">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.edad}
                        </span>
                      </div>
                      <div className="p-2 py-5 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.genero === "Masculino"
                              ? "bg-blue-100 text-blue-800"
                              : user.genero === "Femenino"
                              ? "bg-pink-100 text-pink-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {user.genero}
                        </span>
                      </div>
                      <div className="p-2 py-5 text-gray-600 text-sm truncate text-center">
                        {user.gmail}
                      </div>
                      <div className="p-2 py-5 text-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </div>
                      <div className="p-2 py-5 text-center">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.credencial}
                        </span>
                      </div>
                      <div className="p-2 py-5">
                        <div className="flex gap-1 justify-center">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs transition-all duration-200 transform hover:scale-105 flex items-center"
                          >
                            <i className="bx bx-edit mr-1"></i>Editar
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(user.id, user.nombre)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-all duration-200 transform hover:scale-105 flex items-center"
                          >
                            <i className="bx bx-trash mr-1"></i>Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <ModalCreateUser
        showModal={showCreateModal}
        formData={formData}
        onClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
        onFormDataChange={handleFormDataChange}
      />

      <ModalUpdateUser
        showModal={showUpdateModal}
        formData={formData}
        onClose={closeUpdateModal}
        onSubmit={handleUpdateSubmit}
        onFormDataChange={handleFormDataChange}
      />

      <ModalDeleteUser
        userToDelete={userToDelete}
        customAlert={customAlert}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default UserManager;
