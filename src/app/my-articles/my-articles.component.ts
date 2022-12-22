import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit{
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(!this.userService.user){
      this.router.navigate(['/']);
      return;
    }
    this.articleService.getByAuthor(this.userService.user?.username!).subscribe(articles => { this.articles = articles; console.log(articles) });
  }

}
