import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { IsAuthor } from './is-author.condition';
import { AuthorizationModule } from '../authorization/authorization.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [AuthorizationModule, RolesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, IsAuthor],
})
export class ArticlesModule {}
