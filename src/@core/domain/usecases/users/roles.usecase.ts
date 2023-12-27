import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../../repositories/users/roles.repository';
import { CreateRolesDto } from 'src/@core/app/dto/users/create-roles-dto';

@Injectable()
export class RolesUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findAll() {
    const role = await this.rolesRepository.findAll();
    return role;
  }

  async create(createRolesDto: CreateRolesDto) {
    const role = await this.rolesRepository.create(createRolesDto);
    return role;
  }
}
