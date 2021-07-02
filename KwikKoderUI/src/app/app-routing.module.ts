import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { TestComponent } from 'src/app/pages/test/test.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ViewCompetitionsComponent } from './pages/view-competitions/view-competitions.component';
import { CompetitionTestComponent } from './pages/competition-test/competition-test.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionResultComponent } from './pages/competition-result/competition-result.component';
import { ActiveCompComponent } from './pages/active-comp/active-comp.component'; 

/*
//Routes to out page components
//Please utilize this page for page navigation
*/
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'competitions',
    component: ViewCompetitionsComponent
  },
  { 
    path: 'CompetitionTest/:id',
    component: CompetitionTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'NewCompetition',
    component: CreateCompetitionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'CompetitionResult/:compId',
    component: CompetitionResultComponent
  },
  {
    path: 'ActiveCompetition/:compId',
    component: ActiveCompComponent,
    canActivate: [AuthGuard]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
