import { applyDecorators, Type, UseGuards } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { Condition } from './condition';
import { PolicyGuard } from './policy.guard';

export function Authz(permissions: Permission[], condition?: Type<Condition>) {
  return applyDecorators(UseGuards(PolicyGuard(permissions, condition)));
}
