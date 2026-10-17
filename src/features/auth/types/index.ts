import type { LoginInput } from "../schemas/login.schema";
import type { RegisterInput } from "../schemas/register.schema";

export type { LoginInput, RegisterInput };

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
}
