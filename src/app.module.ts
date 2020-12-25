import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [ArticlesModule, TagsModule, UsersModule, RolesModule, PermissionsModule, AuthorizationModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
