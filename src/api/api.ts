import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const userService = {
  getUsers: () =>
    axios.get("/users", {
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: (userData: any) =>
    axios.post("/users", userData, {
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: (id: number, userData: any) =>
    axios.put(`/users/${id}`, userData, {
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  deleteUser: (id: number) =>
    axios.delete(`/users/${id}`, {
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    }),

  login: async (gmail: string, credencial: string) => {
    try {
      const response = await axios.post(
        "/auth/login",
        { gmail, credencial },
        {
          baseURL: API_BASE_URL,
          headers: { "Content-Type": "application/json" },
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("🔐 Login exitoso:", user);
      console.log("🎫 Token generado:", token);

      return { token, user };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Error en login:", error.response?.data);
      throw new Error(error.response?.data?.error || "Error en el login");
    }
  },

  // Obtener usuario guardado
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obtener token guardado
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Eliminar sesión
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
