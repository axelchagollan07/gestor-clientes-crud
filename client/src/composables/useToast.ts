import { ref } from "vue";

export type TipoToast = "exito" | "error" | "info";

export interface Toast {
  id: number;
  tipo: TipoToast;
  mensaje: string;
}

// Estado compartido a nivel de módulo (patrón "singleton" sin necesidad de Pinia)
const toasts = ref<Toast[]>([]);
let contadorId = 0;

function mostrarToast(mensaje: string, tipo: TipoToast = "info"): void {
  const id = ++contadorId;
  toasts.value.push({ id, tipo, mensaje });

  // Se auto-elimina después de 3.5 segundos
  setTimeout(() => quitarToast(id), 3500);
}

function quitarToast(id: number): void {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

/**
 * Composable de notificaciones tipo "toast".
 * Al definir el estado fuera de la función, todos los componentes
 * que usan useToast() comparten la misma lista de notificaciones.
 */
export function useToast() {
  return { toasts, mostrarToast, quitarToast };
}