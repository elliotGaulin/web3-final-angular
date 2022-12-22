import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { catchError, Observable, throwError } from 'rxjs';
import { MarkdownArticle } from './markdown-article';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  readonly ArticleUrl = "https://final-web3-elliot.onrender.com/article";

  constructor(private httpClient: HttpClient, private userService: UserService, @Inject(LOCALE_ID) public locale: string) {
    console.log(locale);
   }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.ArticleUrl + '/' + this.lang());
  }

  getArticleWithMarkdown(articleId: String): Observable<MarkdownArticle> {
    return this.httpClient.get<MarkdownArticle>(this.ArticleUrl + '/' + this.lang() + '/markdown/' + articleId);
  }

  deleteArticle(articleId: String): Observable<any> {
    return this.httpClient.delete(this.ArticleUrl + '/' + articleId,
      { headers: this.userService.getAuthHeader() }
    );
  }

  addArticle(article: Article, markdown: String): Observable<Article> {
    return this.httpClient.post<Article>(this.ArticleUrl, {
      ...article,
      markdown: markdown
    },
      { headers: this.userService.getAuthHeader() }
    ).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  updateViewCount(articleId: String, viewCount: Number): Observable<Article> {
    return this.httpClient.patch<Article>(this.ArticleUrl + '/' + articleId, {
      views: viewCount
    });
  }

  getTags(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.ArticleUrl + '/tags');
  }

  getArticlesByTag(tag: String): Observable<Article[]> {
    let lang = this.locale.split('-')[0];
    return this.httpClient.get<Article[]>(this.ArticleUrl + "/" + this.lang() + '/tag/' + tag);
  }

  getByAuthor(author: String): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.ArticleUrl + "/" + this.lang() + '/author/' + author);
  }

  lang() {
    return this.locale.split('-')[0];
  }
}
