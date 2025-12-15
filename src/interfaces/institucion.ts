



export interface Institucion {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string[];
  imagen: string;
  contacto: string[];
  correo: string;
  proceso: string;
  contactos?: string[];
  activo?: boolean;
  iframe?: string;

}
