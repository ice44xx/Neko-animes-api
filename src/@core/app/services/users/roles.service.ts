import { Injectable } from '@nestjs/common';
import { RolesRepository } from 'src/@core/infra/database/repositories/users/roles.repository';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRoles(createRolesDto: CreateRolesDto) {
    try {
      const role = await this.rolesRepository.create(createRolesDto);
      return {
        id: role.id,
        name: role.name,
      };
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a role, ' + error.message);
    }
  }

  async findAll() {
    try {
      const role = await this.rolesRepository.findAll();
      return role;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar as roles, ' + error.message);
    }
  }
}
