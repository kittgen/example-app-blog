import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from '../roles/roles.module';
import { AbilityFactory } from './ability.factory';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [RolesModule],
    providers: [AbilityFactory, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
    exports: [AbilityFactory]
})
export class AuthorizationModule {}
