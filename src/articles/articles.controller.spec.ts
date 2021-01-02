import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationModule } from '../authorization/authorization.module';
import { RolesService } from '../roles/roles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthorizationModule],
      controllers: [ArticlesController],
      providers: [ArticlesService, RolesService],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
