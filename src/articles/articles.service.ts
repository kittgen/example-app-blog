import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return [
      new Article("1", "23", "test", 2, new Date()),
      new Article("2", "23", "test2", 3, new Date()),
      new Article("3", "23", "test3", 4, new Date()),
    ]
  }

  findOne(id: string) {
    if (id === 'art-1') {
      return new Article('art-1', 'uid-1', "test", 2, new Date());
    }
    return new Article('art-2', 'uid-2', "test", 2, new Date());
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
