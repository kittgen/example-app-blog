import { Injectable } from '@nestjs/common';
import { Permission } from '../authorization/permissions/permission';
import { User } from '../users/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class RolesService {
  constructor(private moduleRef: ModuleRef) {}

  async getRolesForUser(user: User): Promise<Role[]> {
    if (user.id === 'uid-1') {
      return Promise.resolve([new Role([])]);
    }
    return Promise.resolve([new Role([])]);
  }

  async createForUser(user: User): Promise<Permission[]> {
    const roles = await this.getRolesForUser(user);
    const permissions = roles.flatMap((role) => role.permissions);

    return permissions;
  }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
