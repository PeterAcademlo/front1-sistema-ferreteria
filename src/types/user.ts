export interface User {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
  gmail: string;
  credencial: string;
  role: string; 
}

export type UserFormData = {
   nombre: string;
  edad: string;
  genero: "Masculino" | "Femenino"; 
  gmail: string;
  credencial: string;
  role: "ADMIN" | "SECRETARIO" | "COLABORADOR";
};