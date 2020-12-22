
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { GoogleChartsModule } from 'angular-google-charts';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogindialogComponent } from './components/logindialog/logindialog.component';
import { MaterialModule } from './shared/material.module';
import { RegisterdialogComponent } from './components/registerdialog/registerdialog.component';
import { UserComponent } from './components/user/user.component';

import { AdminComponent } from './components/admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserSidenavComponent } from './components/userDashBoard/user-sidenav/user-sidenav.component';
import { UserFavouriteComponent } from './components/userDashBoard/user-favourite/user-favourite.component';
import { UsergameComponent } from './components/userDashBoard/usergame/usergame.component';
import { UserquizComponent } from './components/userDashBoard/userquiz/userquiz.component';
import { RockpapersissorsComponent } from './components/game/rockpapersissors/rockpapersissors.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { GamesectionComponent } from './components/gamesection/gamesection.component';
import { HomeComponent } from './components/home/home.component';
import { CheckloginComponent } from './components/checklogin/checklogin.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { DisplayQuizComponent } from './components/display-quiz/display-quiz.component';
import { ContactusComponent } from './components/contactus/contactus.component';

import { HighscoreComponent } from './components/highscore/highscore.component';
import { QuizsectionComponent } from './components/quizsection/quizsection.component';
import { ShowScoreComponent } from './components/show-score/show-score.component';
import { RegistrationsuccessdialogComponent } from './components/registrationsuccessdialog/registrationsuccessdialog.component';
import { PlanetComponent } from './components/game/planet/planet.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
  
    FooterComponent,
    LogindialogComponent,
    RegisterdialogComponent,
    UserComponent,
  
    AdminComponent,
    UserSidenavComponent,
    UserFavouriteComponent,
    UsergameComponent,
    UserquizComponent,
    RockpapersissorsComponent,
    HerosectionComponent,
    GamesectionComponent,
    HomeComponent,
    CheckloginComponent,
    QuestionsComponent,
    QuizComponent,
    ResultComponent,
    DisplayQuizComponent,
    ContactusComponent,
  
    HighscoreComponent,
    QuizsectionComponent,
    ShowScoreComponent,
    RegistrationsuccessdialogComponent,
    PlanetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    GoogleChartsModule,
    FlexLayoutModule,
  ],
  exports:[
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
