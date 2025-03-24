import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string()
    .min(3, 'El usuario o teléfono debe tener al menos 3 caracteres')
    .max(50, 'El usuario o teléfono no puede exceder 50 caracteres'),
  password: z.string()
    .min(3, 'La contraseña debe tener al menos 3 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres'),
});

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres'),
  phoneNumber: z.string()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos')
    .max(15, 'El número de teléfono no puede exceder 15 dígitos')
    .regex(/^\d+$/, 'El número de teléfono solo debe contener dígitos'),
  socialLink: z.string()
    .url('Por favor ingresa una URL válida')
    .min(1, 'El link de red social es requerido'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;