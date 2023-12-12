import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/@core/domain/entities/users/roles.entity';
import { Repository } from 'typeorm';
import { CreateRolesDto } from '../../dto/requests/users/create-roles-dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async findAll() {
    return this.rolesRepository.find();
  }

  async create(createRolesDto: CreateRolesDto) {
    const verifyRole = await this.rolesRepository.findOne({
      where: { role: createRolesDto.role },
    });

    if (verifyRole) {
      throw new Error('Essa role já existe');
    }

    const role = this.rolesRepository.create(createRolesDto);
    return this.rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Role não encontrada');
    }

    return this.rolesRepository.delete(id);
  }
}
