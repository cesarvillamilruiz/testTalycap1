import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { UserComponent } from './../pages/user/user.component';
import { AuthorComponent } from './../pages/author/author.component';
import { BookComponent } from './../pages/book/book.component';
import { AuthorBookComponent} from './../pages/author-book/author-book.component';
import { AuthGuard } from './../guard/auth-guard';


const routes: Routes = [
  {
    path: 'modules',
    component: DefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'authors',
        pathMatch: 'full'
      },
      {
        path: 'authors',
        component: AuthorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'books',
        component: BookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'author-book',
        component: AuthorBookComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
