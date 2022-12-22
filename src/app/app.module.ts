import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ViewArticleComponent } from './view-article/view-article.component';
import { MarkdownModule } from 'ngx-markdown';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddArticleComponent } from './add-article/add-article.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListItemComponent,
    NavbarComponent,
    LoginComponent,
    LayoutComponent,
    ViewArticleComponent,
    AddArticleComponent,
    MyArticlesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MarkdownModule.forRoot(),
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
