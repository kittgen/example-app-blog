import { Permission } from './entities/permission.entity';

export class PermissionSet {
  constructor(readonly permissions: Permission[] = []) {}

  add(permission: Permission) {
    this.permissions.push(permission);
    return this;
  }

  hasAll(permissionsToCheck: Permission[]): boolean {
    return permissionsToCheck.reduce(
      (result, p) =>
        result &&
        this.permissions.find((perm) => perm.action === p.action) !== undefined,
      true,
    );
  }
}
