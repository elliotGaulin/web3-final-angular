import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  articleId: String = "";
  article?: Article;
  markdown?: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.articleId = params['articleId'];
    });
  }

  ngOnInit() {
    this.articleService.getArticleWithMarkdown(this.articleId).subscribe((data) => {
      console.log(data);
      this.article = data.article;
      this.markdown = data.markdown;
      this.updateViews();
    });
  }

  updateViews() {
    if(this.article != undefined){

      this.articleService.updateViewCount(this.articleId, this.article?.views + 1).subscribe((data) => {
        console.log(data);
      });
    }
  }

  delete() {
    if (!this.userService.user) {
      this.snackBar.open($localize `You must be logged in to delete an article`, $localize `Dismiss`, {
        duration: 2000,
      });
      return;
    }
    if(this.userService.user._id != this.article?.articleIdentifier) {
      this.snackBar.open($localize `You must be the author to delete an article`, $localize `Dismiss`, {
        duration: 2000,
      });
      return;
    }
    this.articleService.deleteArticle(this.articleId)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/']);
      });
  }

  availableLanguages(): String | undefined {
    return this.article?.availableLanguages?.join(', ');
  }
}
