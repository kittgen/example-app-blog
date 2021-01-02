import { ExecutionContext, Injectable } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Condition } from '../authorization/condition';
import { ConditionsService } from '../authorization/conditions.service';

@Injectable()
export class IsAuthor extends Condition {
  constructor(
    conditionService: ConditionsService,
    private readonly articleService: ArticlesService,
  ) {
    super(conditionService);
  }

  async evaluate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const article = await this.articleService.findOne(req.params.id);
    return article.authorId === (req as any).user.id;
  }
}
