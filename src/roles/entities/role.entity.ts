import { Permission } from '@kittgen/nestjs-authorization';

export class Role {
  constructor(readonly permissions: Permission[]) {}
}
