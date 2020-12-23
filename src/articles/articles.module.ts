import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { IsAuthor } from './is-author.condition';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [AuthorizationModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, IsAuthor]
})
export class ArticlesModule {}
