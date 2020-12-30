import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Condition } from './condition';
import { Permission } from '../permissions/entities/permission.entity';
import { RolesService } from '../roles/roles.service';

export const PolicyGuard = (
  permissions: Permission[],
  condition?: Type<Condition>,
) => {
  @Injectable()
  class PoliciesGuard implements CanActivate {
    constructor(
      private rolesService: RolesService,
      private moduleRef: ModuleRef,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      let cond;
      if (condition) {
        cond = await this.moduleRef.create(condition);
      }

      const req = context.switchToHttp().getRequest();
      const permissionSet = await this.rolesService.createForUser(req.user);

      return (
        permissionSet.hasAll(permissions) &&
        (cond ? await cond.evaluate(req) : true)
      );
    }
  }

  const guard = mixin(PoliciesGuard);
  return guard;
};
