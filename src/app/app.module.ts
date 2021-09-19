import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultModule } from './layout/default.module';
import { UserComponent } from './pages/user/user.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorModalComponent } from './components/modals/author-modal/author-modal.component';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { HeaderNavComponent } from './shared/header-nav/header-nav.component';
import { AuthorBookComponent } from './pages/author-book/author-book.component';

import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    BookComponent,
    AuthorComponent,
    AuthorModalComponent,
    BookModalComponent,
    HeaderNavComponent,
    AuthorBookComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DefaultModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
