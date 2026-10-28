<script setup lang="ts">
import type { Cliente } from "../types/cliente";

defineProps<{
  clientes: Cliente[];
  cargando: boolean;
}>();

const emit = defineEmits<{
  (e: "editar", cliente: Cliente): void;
  (e: "eliminar", cliente: Cliente): void;
}>();

const coloresAvatar = [
  "#4f7cff", "#7c5cff", "#22c55e", "#f5a524", "#f0505b", "#06b6d4",
];

function obtenerIniciales(nombre: string): string {
  const partes = nombre.trim().split(" ").filter(Boolean);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

function obtenerColorAvatar(nombre: string): string {
  const suma = nombre.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return coloresAvatar[suma % coloresAvatar.length];
}

function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
  <!-- Estado de carga: skeleton loaders -->
  <div v-if="cargando" class="grilla">
    <div v-for="n in 3" :key="n" class="tarjeta tarjeta--skeleton">
      <div class="skeleton skeleton--circulo"></div>
      <div class="skeleton skeleton--linea" style="width: 70%"></div>
      <div class="skeleton skeleton--linea" style="width: 90%"></div>
      <div class="skeleton skeleton--linea" style="width: 60%"></div>
    </div>
  </div>

  <!-- Estado vacío -->
  <div v-else-if="clientes.length === 0" class="estado-vacio">
    <div class="estado-vacio__icono">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
    <h3>No hay clientes registrados</h3>
    <p>Comienza agregando tu primer cliente con el botón "Nuevo Cliente".</p>
  </div>

  <!-- Listado -->
  <div v-else class="grilla">
    <article v-for="cliente in clientes" :key="cliente.id" class="tarjeta">
      <div class="tarjeta__encabezado">
        <div
          class="avatar"
          :style="{ backgroundColor: obtenerColorAvatar(cliente.nombreCompleto) }"
        >
          {{ obtenerIniciales(cliente.nombreCompleto) }}
        </div>
        <div class="tarjeta__info-principal">
          <h3>{{ cliente.nombreCompleto }}</h3>
          <span class="tarjeta__fecha">Registrado el {{ formatearFecha(cliente.creadoEn) }}</span>
        </div>
      </div>

      <div class="tarjeta__datos">
        <div class="tarjeta__dato">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16v16H4z" opacity="0" />
            <path d="M22 6l-10 7L2 6" />
            <path d="M2 6h20v12H2z" />
          </svg>
          <span>{{ cliente.email }}</span>
        </div>
        <div class="tarjeta__dato">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
          </svg>
          <span>{{ cliente.empresa }}</span>
        </div>
        <div class="tarjeta__dato" :class="{ 'tarjeta__dato--vacio': !cliente.telefono }">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{{ cliente.telefono || "Sin teléfono registrado" }}</span>
        </div>
      </div>

      <div class="tarjeta__acciones">
        <button class="boton-editar" @click="emit('editar', cliente)">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Editar
        </button>
        <button class="boton-eliminar" @click="emit('eliminar', cliente)">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" /><path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
          Eliminar
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: var(--e-5);
}

.tarjeta {
  background-color: var(--bg-tarjeta);
  border: 1px solid var(--borde);
  border-radius: var(--radio-lg);
  padding: var(--e-5);
  display: flex;
  flex-direction: column;
  gap: var(--e-4);
  transition: background-color var(--normal), transform var(--normal), border-color var(--normal), box-shadow var(--normal);
  animation: aparecer-arriba var(--normal);
}

.tarjeta:hover {
  background-color: var(--bg-tarjeta-hover);
  border-color: var(--borde-fuerte);
  transform: translateY(-3px);
  box-shadow: var(--sombra-2);
}

.tarjeta__encabezado {
  display: flex;
  align-items: center;
  gap: var(--e-3);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radio);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.tarjeta__info-principal h3 {
  font-size: 1.02rem;
  font-weight: 600;
}

.tarjeta__fecha {
  font-size: 0.75rem;
  color: var(--texto-terciario);
}

.tarjeta__datos {
  display: flex;
  flex-direction: column;
  gap: var(--e-2);
  padding-top: var(--e-2);
  border-top: 1px solid var(--borde);
}

.tarjeta__dato {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.87rem;
  color: var(--texto-secundario);
}

.tarjeta__dato .icono {
  width: 16px;
  height: 16px;
  color: var(--texto-terciario);
  flex-shrink: 0;
}

.tarjeta__dato span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tarjeta__dato--vacio span {
  font-style: italic;
  color: var(--texto-terciario);
}

.tarjeta__acciones {
  display: flex;
  gap: var(--e-2);
  margin-top: var(--e-1);
}

.boton-editar, .boton-eliminar {
  flex: 1;
  padding: 9px 0;
  font-size: 0.84rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.boton-editar .icono, .boton-eliminar .icono {
  width: 15px;
  height: 15px;
}

.boton-editar {
  background-color: var(--acento-suave);
  border: 1px solid transparent;
  color: var(--acento);
}
.boton-editar:hover {
  background-color: rgba(79, 124, 255, 0.2);
}

.boton-eliminar {
  background-color: var(--error-suave);
  border: 1px solid transparent;
  color: var(--error);
}
.boton-eliminar:hover {
  background-color: rgba(240, 80, 91, 0.2);
}

/* Estado vacío */
.estado-vacio {
  text-align: center;
  padding: 70px 20px;
  background-color: var(--bg-tarjeta);
  border: 1.5px dashed var(--borde);
  border-radius: var(--radio-lg);
  color: var(--texto-secundario);
}

.estado-vacio__icono {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--e-4);
  color: var(--texto-terciario);
}

.estado-vacio h3 {
  color: var(--texto-principal);
  margin-bottom: var(--e-2);
}

.estado-vacio p {
  margin: 0;
  font-size: 0.9rem;
}

/* Skeleton loaders */
.tarjeta--skeleton {
  gap: var(--e-3);
}

.skeleton {
  background: linear-gradient(90deg, var(--bg-input) 25%, var(--borde) 50%, var(--bg-input) 75%);
  background-size: 200% 100%;
  animation: brillo 1.4s ease-in-out infinite;
  border-radius: var(--radio-sm);
}

.skeleton--circulo {
  width: 48px;
  height: 48px;
  border-radius: var(--radio);
}

.skeleton--linea {
  height: 14px;
}

@keyframes brillo {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>