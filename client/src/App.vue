<script setup lang="ts">
import { ref, onMounted } from "vue";
import EncabezadoApp from "./components/EncabezadoApp.vue";
import ListaClientes from "./components/ListaClientes.vue";
import ClienteFormulario from "./components/ClienteFormulario.vue";
import ModalConfirmar from "./components/ModalConfirmar.vue";
import ToastContainer from "./components/ToastContainer.vue";
import { useClientes } from "./composables/useClientes";
import type { Cliente, ClienteFormulario as ClienteFormData } from "./types/cliente";

const {
  clientesFiltrados,
  clientes,
  cargando,
  terminoBusqueda,
  cargarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} = useClientes();

const mostrarFormulario = ref(false);
const clienteEditar = ref<Cliente | null>(null);

const clienteAEliminar = ref<Cliente | null>(null);
const mostrarConfirmacion = ref(false);

onMounted(() => {
  cargarClientes();
});

function abrirFormularioNuevo(): void {
  clienteEditar.value = null;
  mostrarFormulario.value = true;
}

function abrirFormularioEditar(cliente: Cliente): void {
  clienteEditar.value = cliente;
  mostrarFormulario.value = true;
}

function cerrarFormulario(): void {
  mostrarFormulario.value = false;
  clienteEditar.value = null;
}

async function guardarCliente(datos: ClienteFormData): Promise<void> {
  const exito = clienteEditar.value
    ? await actualizarCliente(clienteEditar.value.id, datos)
    : await crearCliente(datos);

  if (exito) cerrarFormulario();
}

function solicitarEliminar(cliente: Cliente): void {
  clienteAEliminar.value = cliente;
  mostrarConfirmacion.value = true;
}

async function confirmarEliminacion(): Promise<void> {
  if (clienteAEliminar.value) {
    await eliminarCliente(clienteAEliminar.value.id);
  }
  mostrarConfirmacion.value = false;
  clienteAEliminar.value = null;
}

function cancelarEliminacion(): void {
  mostrarConfirmacion.value = false;
  clienteAEliminar.value = null;
}
</script>

<template>
  <div class="contenedor">
    <EncabezadoApp
      v-model:busqueda="terminoBusqueda"
      :total-clientes="clientes.length"
      @nuevo-cliente="abrirFormularioNuevo"
    />

    <ListaClientes
      :clientes="clientesFiltrados"
      :cargando="cargando"
      @editar="abrirFormularioEditar"
      @eliminar="solicitarEliminar"
    />

    <ClienteFormulario
      v-if="mostrarFormulario"
      :cliente-editar="clienteEditar"
      @guardar="guardarCliente"
      @cancelar="cerrarFormulario"
    />

    <ModalConfirmar
      :visible="mostrarConfirmacion"
      titulo="Eliminar cliente"
      :mensaje="`¿Seguro que deseas eliminar a ${clienteAEliminar?.nombreCompleto}? Esta acción no se puede deshacer.`"
      @confirmar="confirmarEliminacion"
      @cancelar="cancelarEliminacion"
    />

    <ToastContainer />
  </div>
</template>