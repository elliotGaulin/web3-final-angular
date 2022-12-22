import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  article : Article = {
    articleIdentifier: '',
    views: 0,
    isVerified: false,
    filename: '',
    defaultLanguage: this.articleService.lang(),
    created: new Date(),
    updated: new Date(),
    name: '',
    description: '',
    tags: [],
    sources: [],
  }
  markdown: string = '';

  tagsTextArea: string = '';
  sourcesTextArea: string = '';

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  addArticle() {
    if(!this.userService.isLoggedIn()) {
      this.snackBar.open($localize `You must be logged in to add an article`, $localize `Dismiss`, {duration: 3000});
      return;
    }

    this.article.tags = this.tagsTextArea.split('\n');
    if(this.sourcesTextArea.length > 0){
      this.article.sources = this.sourcesTextArea.split('\n').map((source: string) => {
        const [name, url] = source.split('|');
        return { name, url };
      });
    }

    this.article.articleIdentifier = this.article.name.replace(/ /g, '-').toLowerCase();

    this.articleService.addArticle(this.article, this.markdown).subscribe((data) => {
      if(data.errors) {
        console.log(data.errors);
        return;
      }
      console.log(data);
      this.router.navigate(['/']);
    });


    console.log(this.article);
  }

  addTag() {
    this.article.tags.push('');
  }

  removeTag(index: number) {
    this.article.tags.splice(index, 1);
  }

}
