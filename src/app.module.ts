import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { MediaModule } from './media/media.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authorization/authn.guard';

@Module({
  imports: [ArticlesModule, TagsModule, UsersModule, RolesModule, MediaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
