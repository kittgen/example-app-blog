/**
 * 
 * Search exact, partial, start, end
 * Multiple
 * DateFilter before, after (equals day,hour,min)
 * Boolean filter 
 * Numeric filter
 * Range filter
 * exists filter
 * order filter
 * paging filter
 * nested filter
 */
export interface ParameterMapper {
    fieldName: string
    map(query: Object): any
}

export abstract class AbstractParameterMapper implements ParameterMapper {
    constructor(readonly fieldName: string) {}

    map(query: Object) {
        if(!query || !query.hasOwnProperty(this.fieldName)) {
            return null
        }
        return this.doMap(query[this.fieldName])
    }

    abstract doMap(parameter: any) 
}