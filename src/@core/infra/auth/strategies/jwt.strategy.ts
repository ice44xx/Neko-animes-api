import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersPayloadDto } from 'src/@core/app/dto/auth/users-payload-dto';
import { EnvConfigService } from '../../env-config/env-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtSecret(),
    });
  }

  async validate(payload: UsersPayloadDto) {
    return {
      id: payload.id,
      userName: payload.userName,
      email: payload.email,
      profile: payload.profile,
      role: payload.role,
      color: payload.color,
      title: payload.title,
    };
  }
}
