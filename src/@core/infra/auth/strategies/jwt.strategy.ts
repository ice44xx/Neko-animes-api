import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersPayloadDto } from 'src/@core/app/dto/requests/auth/users-payload-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UsersPayloadDto) {
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      userName: payload.userName,
    };
  }
}
