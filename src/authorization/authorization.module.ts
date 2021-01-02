import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthnGuard } from './authn.guard';
import { AuthzService } from './authz.service';
import { ConditionsService } from './conditions.service';

@Module({
  imports: [],
  providers: [
    AuthzService,
    ConditionsService,
    {
      provide: APP_GUARD,
      useClass: AuthnGuard,
    },
  ],
  exports: [AuthzService, ConditionsService],
})
export class AuthorizationModule {}
