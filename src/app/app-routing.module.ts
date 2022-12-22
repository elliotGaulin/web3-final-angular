import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ViewArticleComponent } from './view-article/view-article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article/:articleId', component: ViewArticleComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'my-articles', component: MyArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
