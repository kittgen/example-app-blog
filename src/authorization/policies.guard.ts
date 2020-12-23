import { CanActivate, ExecutionContext, Injectable, mixin, SetMetadata, Type } from "@nestjs/common";
import { ModuleRef, Reflector } from "@nestjs/core";
import { PolicyHandler } from "src/authorization/policy-handler.interface";
import { AbilityFactory, KgAbility } from "../authorization/ability.factory";
import { Condition } from "./condition";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);

export const PolicyGuard = (condition?: Type<Condition>) => {
    @Injectable()
    class PoliciesGuard implements CanActivate {
        constructor(
            private reflector: Reflector,
            private abilityFactory: AbilityFactory,
            private moduleRef: ModuleRef,
        ) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            let cond
            if (condition) {
                cond = await this.moduleRef.create(condition);
            }
            const policyHandlers =
                this.reflector.get<PolicyHandler[]>(
                    CHECK_POLICIES_KEY,
                    context.getHandler(),
                ) || [];

            const req = context.switchToHttp().getRequest();
            const ability = this.abilityFactory.createForUser(req.user);

            let result = await policyHandlers.every((handler) =>
                this.execPolicyHandler(handler, ability),
            ) 
            result = result && (cond ? await cond.evaluate(req) : true);
            
            return result;
        }

        private execPolicyHandler(handler: PolicyHandler, ability: KgAbility) {
            if (typeof handler === 'function') {
                return handler(ability);
            }
            return handler.handle(ability);
        }
    }

    const guard = mixin(PoliciesGuard);
    return guard;
}
