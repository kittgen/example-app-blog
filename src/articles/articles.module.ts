import { AuthorizationModule } from '@kittgen/nestjs-authorization';
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { IsAuthor } from './is-author.condition';
import { InMemoryPermissionProvider } from '../authorization/in-memory-permission.provider';

@Module({
  imports: [AuthorizationModule],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    IsAuthor,
    {
      provide: 'PERMISSION_PROVIDER',
      useClass: InMemoryPermissionProvider,
    },
  ],
  exports: [IsAuthor],
})
export class ArticlesModule {}
