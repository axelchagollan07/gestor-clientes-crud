<script setup lang="ts">
import { useToast } from "../composables/useToast";

const { toasts, quitarToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="toasts">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.tipo}`"
        @click="quitarToast(toast.id)"
      >
        <div class="toast__icono">
          <svg v-if="toast.tipo === 'exito'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <svg v-else-if="toast.tipo === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <span class="toast__mensaje">{{ toast.mensaje }}</span>
        <div class="toast__barra"></div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toasts {
  position: fixed;
  top: var(--e-5);
  right: var(--e-5);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

.toast {
  position: relative;
  overflow: hidden;
  padding: 14px 18px 14px 14px;
  border-radius: var(--radio);
  color: white;
  font-size: 0.87rem;
  font-weight: 500;
  box-shadow: var(--sombra-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: 320px;
  animation: entrar-toast 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast--exito { background-color: #16a34a; }
.toast--error { background-color: #dc3545; }
.toast--info { background-color: var(--acento-hover); }

.toast__icono {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.toast__icono svg {
  width: 100%;
  height: 100%;
}

.toast__mensaje {
  flex: 1;
}

.toast__barra {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
  animation: vaciar-barra 3.5s linear forwards;
}

@keyframes entrar-toast {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes vaciar-barra {
  from { width: 100%; }
  to { width: 0%; }
}
</style>