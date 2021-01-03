export class Article {
    constructor(
        readonly id: string, 
        readonly authorId: string,
        readonly body: string,
        readonly views: number,
        readonly publishedAt: Date,
        ) {}
}
