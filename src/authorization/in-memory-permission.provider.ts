import { Injectable } from '@nestjs/common';
import {
  AbstractPermissionProvider,
  ConditionsService,
  SimplePermission,
  PermissionSet,
  SimplePermissionSet,
} from '@kittgen/nestjs-authorization';
import { IsAuthor } from '../articles/is-author.condition';
import { ArticleAuthAction } from '../articles/articles.auth-action';

@Injectable()
export class InMemoryPermissionProvider extends AbstractPermissionProvider {
  constructor(private conditionService: ConditionsService) {
    super();
  }

  async getPermissionSet(req: any): Promise<PermissionSet> {
    if (req.user.id === 'uid-1') {
      return Promise.resolve(
        new SimplePermissionSet([
          new SimplePermission(
            ArticleAuthAction.Read,
            this.conditionService.find(IsAuthor.name),
          ),
        ]),
      );
    }
    return Promise.resolve(
      new SimplePermissionSet([
        new SimplePermission(ArticleAuthAction.Read),
        new SimplePermission(
          ArticleAuthAction.Update,
          this.conditionService.find(IsAuthor.name),
        ),
      ]),
    );
  }
}
