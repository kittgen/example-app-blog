import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthnGuard } from './authn.guard';
import { InMemoryPermissionProvider } from './in-memory-permission.provider';
import { ConditionsService } from './conditions.service';
import { PermissionProvider } from './permission.provider';

@Module({
  imports: [],
  providers: [
    ConditionsService,
    {
      provide: PermissionProvider,
      useClass: InMemoryPermissionProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AuthnGuard,
    },
  ],
  exports: [PermissionProvider, ConditionsService],
})
export class AuthorizationModule {}
