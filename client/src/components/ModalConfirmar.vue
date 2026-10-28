<script setup lang="ts">
defineProps<{
  visible: boolean;
  titulo: string;
  mensaje: string;
}>();

const emit = defineEmits<{
  (e: "confirmar"): void;
  (e: "cancelar"): void;
}>();
</script>

<template>
  <div v-if="visible" class="modal-fondo" @click.self="emit('cancelar')">
    <div class="modal-confirmar">
      <div class="icono-advertencia">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h3>{{ titulo }}</h3>
      <p>{{ mensaje }}</p>
      <div class="acciones">
        <button class="boton-secundario" @click="emit('cancelar')">Cancelar</button>
        <button class="boton-peligro" @click="emit('confirmar')">Sí, eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-fondo {
  position: fixed;
  inset: 0;
  background: rgba(10, 13, 22, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--e-4);
  z-index: 60;
}

.modal-confirmar {
  background-color: var(--bg-superficie);
  border: 1px solid var(--borde);
  border-radius: var(--radio-lg);
  padding: var(--e-6);
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: var(--sombra-3);
  animation: aparecer-modal var(--normal);
}

.icono-advertencia {
  width: 52px;
  height: 52px;
  margin: 0 auto var(--e-4);
  border-radius: 50%;
  background-color: var(--advertencia-suave);
  color: var(--advertencia);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icono-advertencia svg {
  width: 26px;
  height: 26px;
}

.modal-confirmar h3 {
  margin-bottom: var(--e-2);
  font-size: 1.1rem;
}

.modal-confirmar p {
  color: var(--texto-secundario);
  margin: 0 0 var(--e-5);
  font-size: 0.9rem;
  line-height: 1.5;
}

.acciones {
  display: flex;
  gap: var(--e-2);
  justify-content: center;
}
</style>