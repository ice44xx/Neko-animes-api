import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersPayloadDto } from 'src/@core/app/dto/auth/users-payload-dto';
import { ROLES_KEY, UserType } from 'src/@core/infra/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: UsersPayloadDto = await this.jwtService
      .verifyAsync(authorization.replace('Bearer ', ''), {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload || !loginPayload.role) {
      return false;
    }

    const userRole: UserType = this.mapToUserRole(loginPayload.role);

    if (userRole === UserType.Admin) {
      return true;
    }

    return requiredRoles.includes(userRole);
  }

  private mapToUserRole(role: string): UserType {
    if (role === 'admin') {
      return UserType.Admin;
    }

    return UserType.User;
  }
}
