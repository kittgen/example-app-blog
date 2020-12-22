import { Action, Subject } from "../../authorization/ability.factory";

export class Permission {

    constructor(readonly action: Action, readonly subject: Subject) {

    }
}
