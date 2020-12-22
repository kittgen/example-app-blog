import { Permission } from "../../permissions/entities/permission.entity";

export class Role {

    constructor(readonly permissions: Permission[]) {

    }
}
