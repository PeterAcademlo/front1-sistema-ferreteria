import { useState, useEffect } from "react";
import { userService } from "../api/api";
import type { User } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    genero: "Masculino" as "Masculino" | "Femenino",
    gmail: "",
    credencial: "",
    role: "COLABORADOR" as "ADMIN" | "SECRETARIO" | "COLABORADOR",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [customAlert, setCustomAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const showAlert = (type: "success" | "danger", message: string) => {
    setCustomAlert({ type, message });
    setTimeout(() => {
      setCustomAlert(null);
    }, 4000);
  };

  const hideAlert = () => {
    setCustomAlert(null);
  };

  // GET - Obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showAlert("danger", "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // POST/PUT - Crear o actualizar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      edad: parseInt(formData.edad),
    };

    try {
      if (editingId) {
        await userService.updateUser(editingId, userData);
        showAlert("success", "Usuario actualizado exitosamente");
      } else {
        await userService.createUser(userData);
        showAlert("success", "Usuario creado exitosamente");
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
      showAlert("danger", "Error al guardar usuario");
      throw error; // 👈 AÑADE ESTA LÍNEA para propagar el error
    }
  };

  // DELETE - Eliminar usuario
  const handleDelete = async (id: number) => {
    try {
      await userService.deleteUser(id);
      showAlert("success", "Usuario eliminado exitosamente");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showAlert("danger", "Error al eliminar usuario");
    }
  };

  // Editar usuario
  const handleEdit = (user: User) => {
    setFormData({
      nombre: user.nombre,
      edad: user.edad.toString(),
      genero: user.genero as "Masculino" | "Femenino",
      gmail: user.gmail,
      credencial: user.credencial,
      role: user.role as "ADMIN" | "SECRETARIO" | "COLABORADOR",
    });
    setEditingId(user.id);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nombre: "",
      edad: "",
      genero: "Masculino",
      gmail: "",
      credencial: "",
      role: "COLABORADOR",
    });
    setEditingId(null);
  };

  return {
    users,
    loading,
    formData,
    editingId,
    customAlert,
    hideAlert,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
  };
};
