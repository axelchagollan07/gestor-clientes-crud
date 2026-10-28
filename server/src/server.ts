import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clienteRoutes from "./modules/clientes/cliente.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API del Gestor de Clientes funcionando",
    endpoints: {
      listar: "GET /api/clientes",
      crear: "POST /api/clientes",
      obtener: "GET /api/clientes/:id",
      actualizar: "PUT /api/clientes/:id",
      eliminar: "DELETE /api/clientes/:id",
    },
  });
});

app.use("/api/clientes", clienteRoutes);

app.use("/api/clientes", clienteRoutes);

// ─── Ruta no encontrada (404) ───
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// ─── Middleware de errores (siempre al final) ───
app.use(errorHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀  Servidor corriendo en http://localhost:${PORT}\n`);
});