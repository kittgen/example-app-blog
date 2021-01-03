import { AbstractParameterMapper } from "./parameter-mapper.interface"

// todo type check?!
export class ValueListMapper extends AbstractParameterMapper {
    doMap(parameter: any) {
        if (parameter == null) {
            return []
        }
        if (typeof parameter == 'object' || Array.isArray(parameter)) {
            return Object.entries(parameter)
                .filter(keyValue => !Number.isNaN(Number.parseInt(keyValue[0])))
                .map((keyValue) => keyValue[1])
        }
        return [parameter]
    }
}