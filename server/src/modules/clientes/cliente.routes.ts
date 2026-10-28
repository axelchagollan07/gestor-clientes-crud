import { Router } from "express";
import { ClienteController } from "./cliente.controller.js";
import { asyncHandler } from "../../utils/async-handler.js";

const router = Router();
const controller = new ClienteController();

router.get("/", asyncHandler(controller.listar.bind(controller)));
router.get("/:id", asyncHandler(controller.obtenerPorId.bind(controller)));
router.post("/", asyncHandler(controller.crear.bind(controller)));
router.put("/:id", asyncHandler(controller.actualizar.bind(controller)));
router.delete("/:id", asyncHandler(controller.eliminar.bind(controller)));

export default router;