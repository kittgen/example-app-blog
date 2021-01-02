import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService

  beforeEach(async () => {
    service = new ArticlesService()
    controller = new ArticlesController(service)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  it('should filter by id', () => {

  })

});
