// login-response.ts
import { User } from './user'; // replace './user' with the actual path

export interface LoginResponse {
  user: User[];
  jwtToken: string;
}
