<script setup lang="ts">
defineProps<{
  totalClientes: number;
}>();

const terminoBusqueda = defineModel<string>("busqueda", { default: "" });

const emit = defineEmits<{
  (e: "nuevo-cliente"): void;
}>();
</script>

<template>
  <header class="encabezado">
    <div class="encabezado__marca">
      <div class="encabezado__logo">GC</div>
      <div>
        <h1 class="encabezado__titulo">Gestor de Clientes</h1>
        <p class="encabezado__subtitulo">
          <span class="punto-activo"></span>
          {{ totalClientes }} {{ totalClientes === 1 ? "cliente registrado" : "clientes registrados" }}
        </p>
      </div>
    </div>

    <div class="encabezado__acciones">
      <div class="campo-busqueda">
        <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="terminoBusqueda"
          type="text"
          placeholder="Buscar por nombre, email o empresa..."
        />
      </div>

      <button class="boton-primario" @click="emit('nuevo-cliente')">
        <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nuevo Cliente
      </button>
    </div>
  </header>
</template>

<style scoped>
.encabezado {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--e-5);
  padding-bottom: var(--e-6);
  margin-bottom: var(--e-6);
  border-bottom: 1px solid var(--borde);
}

.encabezado__marca {
  display: flex;
  align-items: center;
  gap: var(--e-4);
}

.encabezado__logo {
  width: 46px;
  height: 46px;
  border-radius: var(--radio);
  background: var(--gradiente-acento);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: white;
  box-shadow: var(--sombra-acento);
  flex-shrink: 0;
}

.encabezado__titulo {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #b8c4dd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.encabezado__subtitulo {
  margin: 2px 0 0;
  font-size: 0.85rem;
  color: var(--texto-secundario);
  display: flex;
  align-items: center;
  gap: 6px;
}

.punto-activo {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--exito);
  box-shadow: 0 0 0 3px var(--exito-suave);
}

.encabezado__acciones {
  display: flex;
  gap: var(--e-3);
  flex-wrap: wrap;
}

.campo-busqueda {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 280px;
}

.campo-busqueda .icono {
  position: absolute;
  left: 13px;
  width: 17px;
  height: 17px;
  color: var(--texto-terciario);
  pointer-events: none;
}

.campo-busqueda input {
  padding-left: 40px;
}

@media (max-width: 680px) {
  .encabezado__acciones {
    width: 100%;
    flex-direction: column;
  }
  .campo-busqueda {
    min-width: 0;
    width: 100%;
  }
  .boton-primario {
    justify-content: center;
  }
}
</style>