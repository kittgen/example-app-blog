import { Injectable } from '@nestjs/common';
import { PermissionSet } from '../permissions/permission-set';
import { Permission } from '../permissions/entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  getRolesForUser(user: User): Promise<Role[]> {
    if (user.id === 'uid-1') {
      return Promise.resolve([new Role([new Permission('read-article')])]);
    }
    return Promise.resolve([
      new Role([
        new Permission('read-article'),
        new Permission('update-article'),
      ]),
    ]);
  }
  async createForUser(user: User) {
    const roles = await this.getRolesForUser(user);
    const permissions = roles.flatMap((role) => role.permissions);

    return permissions.reduce(
      (set, permission) => set.add(permission),
      new PermissionSet(),
    );
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
