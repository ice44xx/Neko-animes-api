import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersDto } from 'src/@core/app/dto/users/users-dtos';
import { AuthServices } from 'src/@core/app/services/auth/auth.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServices) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    const validateUsersDto: UsersDto = { email, password };
    return this.authService.validateUser(validateUsersDto);
  }
}
