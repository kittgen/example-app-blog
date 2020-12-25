import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AbilityFactory } from './authorization/ability.factory';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService, private abilityFactory: AbilityFactory) {}

  //@Get(':id')
  getHello(@Param() { id }): string {
    const user = new User(`uid-${id}`);
    const ability = this.abilityFactory.createForUser(user);
    //return this.appService.getHello();
    return `user ${id} can update article: ${ability.can('update', 'article')}`;
  }
}
