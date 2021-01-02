import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { PermissionSet } from './permissions/permission-set';
import { AuthzService } from './authz.service';

export const AuthActionGuard = (actions: string[]) => {
  @Injectable()
  class AuthActionGuardImpl implements CanActivate {
    constructor(private authzService: AuthzService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const permissionsOfUser = await this.authzService.findPermissionsForUser(
        req.user,
      );
      const permissionSet = new PermissionSet(permissionsOfUser);
      return permissionSet.isAllowed(actions, context);
    }
  }

  return mixin(AuthActionGuardImpl) as any;
};
