import { Request, Response } from "express";
import { ClienteService } from "./cliente.service.js";
import { crearClienteSchema, actualizarClienteSchema } from "./cliente.schema.js";

const service = new ClienteService();

export class ClienteController {
  async listar(_req: Request, res: Response): Promise<void> {
    const clientes = await service.listar();
    res.json({ success: true, data: clientes });
  }

  async obtenerPorId(req: Request, res: Response): Promise<void> {
    const cliente = await service.obtenerPorId(req.params.id);
    res.json({ success: true, data: cliente });
  }

  async crear(req: Request, res: Response): Promise<void> {
    const data = crearClienteSchema.parse(req.body);
    const cliente = await service.crear(data);
    res.status(201).json({ success: true, data: cliente });
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    const data = actualizarClienteSchema.parse(req.body);
    const cliente = await service.actualizar(req.params.id, data);
    res.json({ success: true, data: cliente });
  }

  async eliminar(req: Request, res: Response): Promise<void> {
    await service.eliminar(req.params.id);
    res.json({ success: true, message: "Cliente eliminado correctamente" });
  }
}