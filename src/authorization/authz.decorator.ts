import { applyDecorators, Type, UseGuards } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { KgAbility } from './ability.factory';
import { Condition } from './condition';
import { CheckPolicies, PolicyGuard } from './policies.guard';

export function Authz(permission: Permission, condition?: Type<Condition>) {
  return applyDecorators(
    condition ? UseGuards(PolicyGuard(condition)) : UseGuards(PolicyGuard()),
    CheckPolicies((ability: KgAbility) => ability.can(permission.action, permission.subject))
  );
}
