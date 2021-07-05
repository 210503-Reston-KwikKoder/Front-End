import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms'
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/nav-buttons/login-button/login-button.component';
import { SignupButtonComponent } from './components/nav-buttons/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/nav-buttons/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/nav-buttons/authentication-button/authentication-button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LiveCompsComponent } from './pages/live-comps/live-comps.component';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { TestComponent } from './pages/test/test.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ViewCompetitionsComponent } from './pages/view-competitions/view-competitions.component';

import { LangSelectComponent } from './components/lang-select/lang-select.component';
import { CompetitionTestComponent } from './pages/competition-test/competition-test.component';
import { CreateCompetitionComponent } from './pages/create-competition/create-competition.component';
import { DisplayPercentPipe } from './pipes/display-percent.pipe';
import { DisplayDatePipe } from './pipes/display-date.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DisplayCategoryPipe } from './pipes/display-category.pipe'; 
import { CompetitionResultComponent } from './pages/competition-result/competition-result.component';
import { DisplayTimePipe } from './pipes/display-time.pipe';
import { ProgressGraphComponent } from './components/progress-graph/progress-graph.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';

// Node Modules
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//syntax highligher
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ChatComponent } from './components/chat/chat.component';


//Loader Material UI
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


// material UI components
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActiveCompComponent } from './pages/active-comp/active-comp.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PlayerTestAreaComponent } from './components/player-test-area/player-test-area.component';
import { QueComponent } from './components/que/que.component';

//Cluster Chat server
const config: SocketIoConfig = { url: "20.69.69.228",
  options: {
    withCredentials: false,
    path: "/chat-api/socket.io/",
  }
};

//syntax highligher
import { ForumComponent } from './pages/forum/forum.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ForumpostsComponent } from './pages/forumposts/forumposts.component';
// Backup Chat Server:
//  const config: SocketIoConfig = { url: "45.79.192.95:3000",
//  options: {
//   withCredentials: false
//  } };

@NgModule({
  declarations: [
    ActiveCompComponent,
    PlayerTestAreaComponent,
    QueComponent,
    ChatComponent,
    LiveCompsComponent,
    AppComponent,
    LoadingComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    NavBarComponent,
    ProfileComponent,
    HomeComponent,
    TestComponent,
    LeaderboardComponent,
    ViewCompetitionsComponent,
    LangSelectComponent,
    CompetitionTestComponent,
    CreateCompetitionComponent,
    DisplayPercentPipe,
    DisplayDatePipe,
    SnackBarComponent,
    DisplayCategoryPipe,
    CompetitionResultComponent,
    DisplayTimePipe,
    ProgressGraphComponent,
    ActiveCompComponent,
    PlayerTestAreaComponent,
    QueComponent,
    ForumComponent,
    ForumpostsComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HighlightModule,
    EditorModule,
    AuthModule.forRoot({
      domain: env.auth.domain,
      clientId: env.auth.clientId,
      audience: env.auth.audience,
      scope: 'read:current_user',
      httpInterceptor:{
        allowedList:[
          //`${env.dev.serverUrl}api/test/CodeSnippet/Secret`,
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}typetest/api/TypeTest*`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}typetest/api/UserStat/tests/all`,
              httpMethod: "GET",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}typetest/api/User/username`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // this works currentlly 7/2/21
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}competition/api/Competition`,
              httpMethod: "POST",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.forumApi}comment/*`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.forumApi}comment`,
              httpMethod: "POST",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.forumApi}ForumPost/*`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.forumApi}ForumPost`,
              httpMethod: "POST",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}typetest/api/UserStat/*`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            },
            {
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}competition/api/CompetitonTests`,
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            }
            //,{
            //   uri: `${env.dev.serverUrl}api/Competition/bet`,
            //   httpMethod: "PUT",
            //   tokenOptions: {
            //     // The attached token should target this audience
            //     audience: env.auth.audience,
            //     // The attached token should have these scopes
            //     scope: 'read:current_user',
            //     //Authorization: `Bearer ${ this.userToken }`
            //   }
            // }
            ,{
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
              httpMethod: "PUT",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            }
            ,{
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
              httpMethod: "DELETE",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            }
            ,{
              // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
              uri: `${env.dev.serverUrl}competition/api/LiveCompetition`,
              httpMethod: "POST",
              tokenOptions: {
                // The attached token should target this audience
                audience: env.auth.audience,
                // The attached token should have these scopes
                scope: 'read:current_user',
                //Authorization: `Bearer ${ this.userToken }`
              }
            }

        ]
      }
    }),
    SocketIoModule.forRoot(config),
  ],
  providers: [
      DatePipe,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true,
      },
      {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
          fullLibraryLoader: () => import('highlight.js'),
        }
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
