import { z } from 'zod';

export const personalInfoSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Por favor ingresa un email válido'),
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^\d+$/, 'El teléfono solo debe contener dígitos'),
});

export const cardPaymentSchema = z.object({
  numeroTarjeta: z.string()
    .regex(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
  nombreTarjeta: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  fechaExpiracion: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Formato inválido. Use MM/AA'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'El CVV debe tener 3 o 4 dígitos'),
});

export const checkoutSchema = z.object({
  ...personalInfoSchema.shape,
  paymentMethod: z.enum(['card', 'transfer', 'deposit']),
  cardInfo: cardPaymentSchema.optional(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type CardPaymentData = z.infer<typeof cardPaymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;