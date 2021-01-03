import { User } from '../users/entities/user.entity';
import { Permission } from './permissions/permission';

export abstract class PermissionProvider {
  abstract findPermissionsForUser(user: User): Promise<Permission[]>;
}
