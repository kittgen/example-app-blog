import { ExecutionContext } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

export abstract class Condition {
  constructor(conditionsService: ConditionsService) {
    conditionsService.register(this);
  }

  get id() {
    return this.constructor.name;
  }

  abstract evaluate(ctx: ExecutionContext): Promise<boolean>;
}
