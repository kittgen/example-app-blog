import { KgAbility } from "./ability.factory";

interface IPolicyHandler {
    handle(ability: KgAbility): boolean
}

type PolicyHandlerCallback = (ability: KgAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback7667