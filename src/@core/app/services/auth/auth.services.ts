import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedError } from 'src/@core/infra/auth/errors/errors';
import { Users } from '@prisma/client';
import { UsersPayloadDto } from '../../dto/auth/users-payload-dto';
import { UsersDto } from '../../dto/users/users-dtos';

@Injectable()
export class AuthServices {
  constructor(
    private readonly jwtService: JwtService,
    private readonly user: UsersService,
  ) {}

  async login({ id }: Users) {
    const user = await this.user.findById({ id });

    const payload: UsersPayloadDto = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      userName: user.userName,
      role: user.role,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser({ email, password }: UsersDto) {
    const user = await this.user.findByEmail({ email });

    if (!user) {
      throw new UnauthorizedError('Email ou senha incorreto');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return {
        ...user,
        password: undefined,
      };
    }
  }
}
