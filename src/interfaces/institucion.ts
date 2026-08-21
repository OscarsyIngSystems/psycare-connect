// src/interfaces/institucion.ts

export interface Direccion {
  id: number;
  direccion: string;
}

export interface Institucion {
  id: number;
  nombre: string;
  descripcion: string;
  contacto: string;
  correo: string | null;
  direcciones: Direccion[];
  iframe: string;
  imagen: string;
  proceso: string;
  // Propiedad local para controlar visibilidad en el frontend
  activo?: boolean; // Opcional, solo para uso frontend
}

// Para el formulario (creación/edición)
export interface InstitucionForm {
  nombre: string;
  descripcion: string;
  contacto: string;
  correo: string;
  direccion: string;
  iframe: string;
  imagen: string;
  proceso: string;
  activo: boolean; // Solo para el frontend
}

// Para crear un nuevo instituto (sin ID)
export interface InstitucionCreate {
  nombre: string;
  descripcion: string;
  contacto: string;
  correo?: string | null;
  direcciones?: Omit<Direccion, 'id'>[];
  iframe?: string;
  imagen?: string;
  proceso?: string;
  // activo no se envía al backend
}

// Para actualizar un instituto
export interface InstitucionUpdate {
  nombre?: string;
  descripcion?: string;
  contacto?: string;
  correo?: string | null;
  direcciones?: Omit<Direccion, 'id'>[];
  iframe?: string;
  imagen?: string;
  proceso?: string;
  // activo no se envía al backend
}
