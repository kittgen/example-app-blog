import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthAction } from '@kittgen/nestjs-authorization';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleAuthAction } from './articles.auth-action';
import { ArticleQueryMapper } from './articles.query-mapper';
import { MapQuery } from '../query-mapper/map-query.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(@MapQuery(new ArticleQueryMapper()) query) {
    return {
      query: query,
      articles: this.articlesService.findAll(),
    };
  }

  @Get(':id')
  @AuthAction([ArticleAuthAction.Read])
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  // IsAuthor is additional condition
  @AuthAction([ArticleAuthAction.Update])
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @AuthAction([ArticleAuthAction.Delete])
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
