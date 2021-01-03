import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryMapper } from './query-mapper.interface';

export const MapQuery = createParamDecorator(
    (mapper: QueryMapper, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      if(!mapper) {
          return Error("no mapper registered. Usage: @MapQuery(MyMapper)")
      }
      return mapper.map(request.query)
    },
  )