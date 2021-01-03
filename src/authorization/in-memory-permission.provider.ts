import { Injectable } from '@nestjs/common';
import { Permission } from './permissions/permission';
import { User } from '../users/entities/user.entity';
import { ConditionsService } from './conditions.service';
import { IsAuthor } from '../articles/is-author.condition';
import { PermissionProvider } from './permission.provider';

@Injectable()
export class InMemoryPermissionProvider extends PermissionProvider {
  constructor(private conditionService: ConditionsService) {
    super();
  }

  async findPermissionsForUser(user: User): Promise<Permission[]> {
    if (user.id === 'uid-1') {
      return Promise.resolve([new Permission('read-article')]);
    }
    return Promise.resolve([
      new Permission('read-article'),
      new Permission(
        'update-article',
        this.conditionService.find(IsAuthor.name),
      ),
    ]);
  }
}
