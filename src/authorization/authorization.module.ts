import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { AbilityFactory } from './ability.factory';

@Module({
    imports: [RolesModule],
    providers: [AbilityFactory],
    exports: [AbilityFactory]
})
export class AuthorizationModule {}
