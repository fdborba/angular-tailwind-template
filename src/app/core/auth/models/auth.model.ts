import { z } from 'zod';

export const AuthResponseSchema = z.object({
  message:    z.string(),
  pagination: z.null(),
  data:       z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export interface LoginCredentials {
  identificador: string;
  login:         string;
  password:      string;
  usuarioLog:    string;
  usuarioTipos:  number[];
  usuarioRoles:  string[];
}