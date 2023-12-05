import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUsersDto } from 'src/@core/app/dto/requests/auth/validate-users-dto';
import { AuthServices } from 'src/@core/app/services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServices) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    const validateUsersDto: ValidateUsersDto = { email, password };
    return this.authService.validateUser(validateUsersDto);
  }
}
