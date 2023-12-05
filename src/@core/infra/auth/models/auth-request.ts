import { Request } from 'express';
import { Users } from 'src/@core/domain/entities/users/users.entity';

export interface AuthRequest extends Request {
  user: Users;
}
