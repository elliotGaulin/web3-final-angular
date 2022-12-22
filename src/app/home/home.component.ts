import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  tags: String[] = [];
  selectedTag: String = '';
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    //Ne pas attendre que les articles soient chargés pour charger les tags causait une erreur dans express
    this.articleService.getArticles().subscribe(articles => { this.articles = articles; console.log(articles); this.getTags(); });
  }

  getTags(){
    this.articleService.getTags().subscribe(tags => { this.tags = tags; console.log(tags) });
  }

  getArticlesByTag(){
    if(this.selectedTag == ''){
      this.articleService.getArticles().subscribe(articles => { this.articles = articles; console.log(articles) });
      return;
    }
    this.articleService.getArticlesByTag(this.selectedTag).subscribe(articles => { this.articles = articles; console.log(articles) });
  }

}
