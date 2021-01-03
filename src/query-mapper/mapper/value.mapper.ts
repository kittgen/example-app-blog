import { AbstractParameterMapper } from "./parameter-mapper.interface"

// todo type check?!
export class ValueMapper extends AbstractParameterMapper {
    doMap(parameter: any) {
        if (parameter == null) {
            return null
        }
        if (typeof parameter == 'object' || Array.isArray(parameter)) {
            if (parameter.length == 0) {
                return null
            }
            // return first
            return Object.values(parameter)[0]
        }
        return parameter
    }
}