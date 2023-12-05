import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ValidateUsersDto } from '../../dto/requests/auth/validate-users-dto';
import { UnauthorizedError } from 'src/@core/infra/auth/errors/errors';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { UsersPayloadDto } from '../../dto/requests/auth/users-payload-dto';

@Injectable()
export class AuthServices {
  constructor(
    private readonly jwtService: JwtService,
    private readonly user: UsersService,
  ) {}

  async login(user: Users) {
    const payload: UsersPayloadDto = {
      firstName: user.firstName,
      email: user.email,
      userName: user.userName,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(validateUsersDto: ValidateUsersDto) {
    const user = await this.user.findByEmail(validateUsersDto.email);
    if (!user) {
      throw new UnauthorizedError('Email ou senha incorreto');
    }
    const isPasswordValid = await bcrypt.compare(
      validateUsersDto.password,
      user.password,
    );
    if (isPasswordValid) {
      return {
        ...user,
        password: undefined,
      };
    }
  }
}
