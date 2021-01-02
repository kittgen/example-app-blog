import { Permission } from '../../authorization/permissions/permission';

export class Role {
  constructor(readonly permissions: Permission[]) {}
}
