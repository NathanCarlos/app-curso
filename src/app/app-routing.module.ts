import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'task', loadChildren: './task/task.module#TaskPageModule' },
  { path: 'exit', loadChildren: './exit/exit.module#ExitPageModule' },
  { path: 'task-details', loadChildren: './task-details/task-details.module#TaskDetailsPageModule' },
  { path: 'listAll', loadChildren: './list-all/list-all.module#ListAllPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
