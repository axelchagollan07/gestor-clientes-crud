import { PrismaClient, Prisma } from "@prisma/client";
import { AppError } from "../../utils/app-error.js";
import type { CrearClienteInput, ActualizarClienteInput } from "./cliente.schema.js";

const prisma = new PrismaClient();

export class ClienteService {
  async listar() {
    return prisma.cliente.findMany({
      orderBy: { creadoEn: "desc" },
    });
  }

  async obtenerPorId(id: string) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new AppError("Cliente no encontrado", 404);
    }
    return cliente;
  }

  async crear(data: CrearClienteInput) {
    try {
      return await prisma.cliente.create({ data });
    } catch (error) {
      this.manejarErrorPrisma(error);
      throw error;
    }
  }

  async actualizar(id: string, data: ActualizarClienteInput) {
    const existe = await prisma.cliente.findUnique({ where: { id } });
    if (!existe) {
      throw new AppError("Cliente no encontrado", 404);
    }

    try {
      return await prisma.cliente.update({ where: { id }, data });
    } catch (error) {
      this.manejarErrorPrisma(error);
      throw error;
    }
  }

  async eliminar(id: string) {
    const existe = await prisma.cliente.findUnique({ where: { id } });
    if (!existe) {
      throw new AppError("Cliente no encontrado", 404);
    }
    return prisma.cliente.delete({ where: { id } });
  }

  private manejarErrorPrisma(error: unknown): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError("Ya existe un cliente con ese email", 409);
    }
  }
}