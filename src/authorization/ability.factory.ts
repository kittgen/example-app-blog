import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability'
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { RolesService } from '../roles/roles.service';

export type Action = 'read' | 'update';
export type Subject = 'article' | 'tag';


export type KgAbility = Ability<[Action, Subject]>;

@Injectable()
export class AbilityFactory {
    constructor(
        private readonly rolesService: RolesService
    ) {}

    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subject]>>(Ability as AbilityClass<KgAbility>);
        
        const roles = this.rolesService.getRolesForUser(user)
        //const permissions = roles.flatMap(role => role.permissions)
        const permissions = []
        permissions.forEach(permission => can(permission.action, permission.subject))

        return build();
    }
}