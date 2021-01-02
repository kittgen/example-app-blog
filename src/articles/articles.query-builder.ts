import { createParamDecorator, ExecutionContext } from '@nestjs/common';

class IdFilter {
    constructor(readonly fieldName: string) {}

    static for(fieldName: string) {
        return new IdFilter(fieldName)
    }
}

class ArticleQueryBuilder {

    static definition = [
        IdFilter.for("id"),

    ]

}

export const XQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
        servedBy: 'XQuery',
        query: request.query
    }
    
  },
)