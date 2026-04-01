import { z } from 'zod';

export const AuthResponseSchema = z.object({
  Sucesso:  z.boolean(),
  Mensagem: z.string(),
  Data: z.object({
    Access_token:  z.string(),
    Refresh_token: z.string(),
  }),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export interface LoginCredentials {
  Usuario: string;
  Senha:   string;
}