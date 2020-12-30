import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IsAuthor } from './is-author.condition';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Authz } from '../authorization/authz.decorator';
import { Permission } from '../permissions/entities/permission.entity';
import { ArticleAuthAction } from './articles.auth-action';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @Authz([new Permission(ArticleAuthAction.Read)])
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  // IsAuthor is additional condition
  @Authz([new Permission(ArticleAuthAction.Update)], IsAuthor)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Authz([new Permission(ArticleAuthAction.Delete)], IsAuthor)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
