import { ParameterMapper } from "./mapper/parameter-mapper.interface"

export interface QueryMapper {
    map(query: Object): Object
}

interface MappedQuery {
    [dynamic: string]: any
    _rawQuery: Object
}

export abstract class AbstractQueryMapper implements QueryMapper {

    constructor(readonly mappers: ParameterMapper[]) { }

    map(query: Object): MappedQuery {
        if (query == null) {
            return null
        }

        const mappedQuery = {}
        this.mappers.forEach(mapper => {
            const mappedParameter = mapper.map(query)
            if (mappedParameter != null) {
                mappedQuery[mapper.fieldName] = mappedParameter
            }
        })

        return {
            ...mappedQuery,
            _rawQuery: query
        }
    }

}