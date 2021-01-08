import { ExecutionContext, Injectable } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  AbstractCondition,
  ConditionsService,
} from '@kittgen/nestjs-authorization';

@Injectable()
export class IsAuthor extends AbstractCondition {
  constructor(
    conditionService: ConditionsService,
    private readonly articleService: ArticlesService,
  ) {
    super(conditionService);
  }

  async check(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const article = await this.articleService.findOne(req.params.id);
    return article.authorId === (req as any).user.id;
  }
}
