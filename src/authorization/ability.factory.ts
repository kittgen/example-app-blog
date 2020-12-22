import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability'
import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

type User = 'todo-user'
type Action = 'todo-action'
type Subjects = 'todo-subject'


export type KgAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    constructor(
        private readonly rolesService: RolesService
    ) {}

    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<KgAbility>);
        const roles = this.rolesService.getRolesForUser(user)
        const permissions = roles.flatMap(role => role.getPermissions())

    }
}


@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all'); // read-only access to everything
        }

        can(Action.Update, Article, { authorId: user.id });
        cannot(Action.Delete, Article, { isPublished: true });

        return build();
    }
}