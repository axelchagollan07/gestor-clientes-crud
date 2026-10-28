<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import type { Cliente, ClienteFormulario as ClienteFormData } from "../types/cliente";

const props = defineProps<{
  clienteEditar: Cliente | null;
}>();

const emit = defineEmits<{
  (e: "guardar", datos: ClienteFormData): void;
  (e: "cancelar"): void;
}>();

const form = reactive<ClienteFormData>({
  nombreCompleto: "",
  email: "",
  telefono: "",
  empresa: "",
});

const errores = reactive<Record<string, string>>({});
const guardando = ref(false);

watch(
  () => props.clienteEditar,
  (cliente) => {
    form.nombreCompleto = cliente?.nombreCompleto ?? "";
    form.email = cliente?.email ?? "";
    form.telefono = cliente?.telefono ?? "";
    form.empresa = cliente?.empresa ?? "";
    limpiarErrores();
  },
  { immediate: true }
);

function limpiarErrores(): void {
  Object.keys(errores).forEach((clave) => delete errores[clave]);
}

function validar(): boolean {
  limpiarErrores();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.nombreCompleto.trim()) {
    errores.nombreCompleto = "El nombre completo es obligatorio";
  }
  if (!form.email.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!regexEmail.test(form.email.trim())) {
    errores.email = "El formato del email no es válido";
  }
  if (!form.empresa.trim()) {
    errores.empresa = "La empresa es obligatoria";
  }

  return Object.keys(errores).length === 0;
}

async function manejarSubmit(): Promise<void> {
  if (!validar()) return;
  guardando.value = true;
  emit("guardar", { ...form });
  // El componente padre decide cuándo cerrar; reseteamos el flag por si falla
  setTimeout(() => (guardando.value = false), 600);
}
</script>

<template>
  <div class="modal-fondo" @click.self="emit('cancelar')">
    <div class="modal">
      <div class="modal__cabecera">
        <h2>{{ clienteEditar ? "Editar Cliente" : "Nuevo Cliente" }}</h2>
        <button class="boton-cerrar" @click="emit('cancelar')" aria-label="Cerrar">
          <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="manejarSubmit" novalidate>
        <div class="campo">
          <label for="nombreCompleto">Nombre completo *</label>
          <div class="campo__con-icono">
            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <input
              id="nombreCompleto"
              v-model="form.nombreCompleto"
              type="text"
              placeholder="Ej. Juan Pérez"
              :class="{ 'input-error': errores.nombreCompleto }"
            />
          </div>
          <span v-if="errores.nombreCompleto" class="campo__error">{{ errores.nombreCompleto }}</span>
        </div>

        <div class="campo">
          <label for="email">Email *</label>
          <div class="campo__con-icono">
            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 6l-10 7L2 6" /><path d="M2 6h20v12H2z" />
            </svg>
            <input
              id="email"
              v-model="form.email"
              type="text"
              placeholder="ejemplo@correo.com"
              :class="{ 'input-error': errores.email }"
            />
          </div>
          <span v-if="errores.email" class="campo__error">{{ errores.email }}</span>
        </div>

        <div class="campo">
          <label for="telefono">Teléfono (opcional)</label>
          <div class="campo__con-icono">
            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <input id="telefono" v-model="form.telefono" type="text" placeholder="Ej. 555-123-4567" />
          </div>
        </div>

        <div class="campo">
          <label for="empresa">Empresa *</label>
          <div class="campo__con-icono">
            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
            </svg>
            <input
              id="empresa"
              v-model="form.empresa"
              type="text"
              placeholder="Ej. Acme Corp"
              :class="{ 'input-error': errores.empresa }"
            />
          </div>
          <span v-if="errores.empresa" class="campo__error">{{ errores.empresa }}</span>
        </div>

        <div class="modal__acciones">
          <button type="button" class="boton-secundario" @click="emit('cancelar')">
            Cancelar
          </button>
          <button type="submit" class="boton-primario" :disabled="guardando">
            {{ guardando ? "Guardando..." : (clienteEditar ? "Guardar cambios" : "Crear cliente") }}
          </button>
        </div>
      </form>
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
  z-index: 50;
}

.modal {
  background-color: var(--bg-superficie);
  border: 1px solid var(--borde);
  border-radius: var(--radio-lg);
  padding: var(--e-6);
  width: 100%;
  max-width: 460px;
  box-shadow: var(--sombra-3);
  animation: aparecer-modal var(--normal);
}

.modal__cabecera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--e-5);
}

.modal__cabecera h2 {
  font-size: 1.2rem;
}

.boton-cerrar {
  background: var(--bg-tarjeta);
  width: 32px;
  height: 32px;
  border-radius: var(--radio-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--texto-secundario);
}
.boton-cerrar:hover {
  background-color: var(--bg-tarjeta-hover);
  color: var(--texto-principal);
}
.boton-cerrar .icono {
  width: 16px;
  height: 16px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: var(--e-4);
}

.campo label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--texto-secundario);
}

.campo__con-icono {
  position: relative;
  display: flex;
  align-items: center;
}

.campo__con-icono .icono {
  position: absolute;
  left: 13px;
  width: 16px;
  height: 16px;
  color: var(--texto-terciario);
  pointer-events: none;
}

.campo__con-icono input {
  padding-left: 40px;
}

.input-error {
  border-color: var(--error) !important;
}
.input-error:focus {
  box-shadow: 0 0 0 3px var(--error-suave) !important;
}

.campo__error {
  color: var(--error);
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.modal__acciones {
  display: flex;
  justify-content: flex-end;
  gap: var(--e-2);
  margin-top: var(--e-2);
}
</style>