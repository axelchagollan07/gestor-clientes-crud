import { ref, computed } from "vue";
import { api } from "../services/api";
import type { Cliente, ClienteFormulario, ApiResponse } from "../types/cliente";
import { useToast } from "./useToast";

// Estado compartido a nivel de módulo
const clientes = ref<Cliente[]>([]);
const cargando = ref(false);
const terminoBusqueda = ref("");

const { mostrarToast } = useToast();

const clientesFiltrados = computed(() => {
  const termino = terminoBusqueda.value.trim().toLowerCase();
  if (!termino) return clientes.value;

  return clientes.value.filter(
    (c) =>
      c.nombreCompleto.toLowerCase().includes(termino) ||
      c.email.toLowerCase().includes(termino) ||
      c.empresa.toLowerCase().includes(termino)
  );
});

async function cargarClientes(): Promise<void> {
  cargando.value = true;
  try {
    const { data } = await api.get<ApiResponse<Cliente[]>>("/api/clientes");
    clientes.value = data.data ?? [];
  } catch {
    mostrarToast("No se pudieron cargar los clientes", "error");
  } finally {
    cargando.value = false;
  }
}

async function crearCliente(form: ClienteFormulario): Promise<boolean> {
  try {
    const { data } = await api.post<ApiResponse<Cliente>>("/api/clientes", form);
    if (data.data) clientes.value.unshift(data.data);
    mostrarToast("Cliente creado correctamente", "exito");
    return true;
  } catch (error) {
    manejarErrorApi(error);
    return false;
  }
}

async function actualizarCliente(id: string, form: ClienteFormulario): Promise<boolean> {
  try {
    const { data } = await api.put<ApiResponse<Cliente>>(`/api/clientes/${id}`, form);
    const index = clientes.value.findIndex((c) => c.id === id);
    if (index !== -1 && data.data) clientes.value[index] = data.data;
    mostrarToast("Cliente actualizado correctamente", "exito");
    return true;
  } catch (error) {
    manejarErrorApi(error);
    return false;
  }
}

async function eliminarCliente(id: string): Promise<boolean> {
  try {
    await api.delete(`/api/clientes/${id}`);
    clientes.value = clientes.value.filter((c) => c.id !== id);
    mostrarToast("Cliente eliminado correctamente", "exito");
    return true;
  } catch {
    mostrarToast("No se pudo eliminar el cliente", "error");
    return false;
  }
}

/**
 * Traduce errores de Axios (incluyendo los que vienen del backend
 * con formato { message, errors }) en notificaciones toast legibles.
 */
function manejarErrorApi(error: unknown): void {
  const err = error as { response?: { data?: ApiResponse<unknown> } };
  const respuesta = err?.response?.data;

  if (respuesta?.errors?.length) {
    respuesta.errors.forEach((e) => mostrarToast(e.mensaje, "error"));
  } else {
    mostrarToast(respuesta?.message || "Ocurrió un error inesperado", "error");
  }
}

/**
 * Composable principal del CRUD de clientes.
 * Centraliza estado + lógica de peticiones, evitando duplicar
 * código en cada componente que necesite trabajar con clientes.
 */
export function useClientes() {
  return {
    clientes,
    clientesFiltrados,
    cargando,
    terminoBusqueda,
    cargarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
  };
}