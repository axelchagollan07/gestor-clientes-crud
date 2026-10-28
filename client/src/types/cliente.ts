export interface Cliente {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono: string | null;
  empresa: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface ClienteFormulario {
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa: string;
}

export interface ErrorCampo {
  campo: string;
  mensaje: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ErrorCampo[];
}