import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { IsAuthor } from './is-author.condition';

@Module({
  imports: [AuthorizationModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, IsAuthor],
  exports: [IsAuthor],
})
export class ArticlesModule {}
