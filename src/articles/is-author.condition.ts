import { Injectable } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { Condition } from "../authorization/condition";

@Injectable()
export class IsAuthor implements Condition {
  constructor(private readonly articleService: ArticlesService) { }

  async evaluate(req: any): Promise<boolean> {
    const article = await this.articleService.findOne(req.query.articleId);
    return article.authorId === req.user.id;
  }
}
