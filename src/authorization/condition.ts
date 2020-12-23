import { Request } from 'express';

export interface Condition {
    evaluate(req: Request): Promise<boolean>
}
