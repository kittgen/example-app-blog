import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from '../roles/roles.module';
import { AuthnGuard } from './authn.guard';

@Module({
  imports: [RolesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthnGuard,
    },
  ],
  exports: [],
})
export class AuthorizationModule {}
