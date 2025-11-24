import axios from "axios";

const API_BASE_URL = "https://back1-sistema-ferreteria.onrender.com";
// const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userService = {
  getUsers: () => api.get("/users"),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: (userData: any) => api.post("/users", userData),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: (id: number, userData: any) => api.put(`/users/${id}`, userData),

  deleteUser: (id: number) => api.delete(`/users/${id}`),

  login: async (gmail: string, credencial: string) => {
    try {
      const response = await api.post("/auth/login", { gmail, credencial });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log(" Login exitoso:", user);
      console.log(" Token generado:", token);

      return { token, user };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(" Error en login:", error.response?.data);
      throw new Error(error.response?.data?.error || "Error en el login");
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
