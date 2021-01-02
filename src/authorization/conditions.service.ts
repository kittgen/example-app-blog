import { Condition } from './condition';

export class ConditionsService {
  private conditionsById: Map<string, Condition>;

  constructor() {
    this.conditionsById = new Map();
  }

  register(condition: Condition) {
    this.conditionsById.set(condition.id, condition);
  }

  find(conditionId: string): Condition | undefined {
    return this.conditionsById.get(conditionId);
  }
}