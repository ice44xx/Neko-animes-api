import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthServices } from '../../services/auth/auth.service';
import { LocalAuthGuard } from 'src/@core/infra/auth/guards/local-auth.guard';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { IsPublic } from 'src/@core/infra/decorators/is-public.decorator';
@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authServices.login(req.user);
  }
}
