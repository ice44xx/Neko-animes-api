import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';
import { RolesUseCase } from 'src/@core/domain/usecases/users/roles.usecase';

@Injectable()
export class RolesService {
  constructor(private readonly rolesUseCase: RolesUseCase) {}

  async findAll() {
    return await this.rolesUseCase.findAll();
  }

  async create(createRolesDto: CreateRolesDto) {
    return await this.rolesUseCase.create(createRolesDto);
  }
}
