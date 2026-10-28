import { z } from "zod";

export const crearClienteSchema = z.object({
  nombreCompleto: z
    .string({ required_error: "El nombre completo es obligatorio" })
    .trim()
    .min(1, "El nombre completo no puede estar vacío"),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .trim()
    .toLowerCase()
    .email("Debe ser un email válido"),
  telefono: z
    .string()
    .trim()
    .optional()
    .transform((val) => val || undefined),
  empresa: z
    .string({ required_error: "La empresa es obligatoria" })
    .trim()
    .min(1, "La empresa no puede estar vacía"),
});

export const actualizarClienteSchema = crearClienteSchema.partial();

export type CrearClienteInput = z.infer<typeof crearClienteSchema>;
export type ActualizarClienteInput = z.infer<typeof actualizarClienteSchema>;