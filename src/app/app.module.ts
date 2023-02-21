import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { SigninComponent } from './components/signin/signin.component'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProComponent } from './components/pro/pro.component';
import { AmateurComponent } from './components/amateur/amateur.component';
import { SigninModule } from './signin/signin.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { ProfileComponent } from './profile/profile.component';
import { SalleComponent } from './shared/components/salle/salle.component';
import { MaterielComponent } from './shared/components/materiel/materiel.component';
import { SalleRepetitionComponent } from './shared/components/salle-repetition/salle-repetition.component';
import { StudioEnregistrementComponent } from './shared/components/studio-enregistrement/studio-enregistrement.component';
import { MusicInstrumentCardComponent } from "./shared/components/music-instrument-card/music-instrument-card.component";
import { TheaterCardComponent } from "./shared/components/theater-card/theater-card.component";
import { ReheasalRoomCardComponent } from "./shared/components/reheasal-room-card/reheasal-room-card.component";
import { RecordingStudioCardComponent } from "./shared/components/recording-studio-card/recording-studio-card.component";



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        SigninComponent,
        ProComponent,
        AmateurComponent,
        CreatePostComponent,
        ProfileComponent,
        SalleComponent,
        MaterielComponent,
        SalleRepetitionComponent,
        StudioEnregistrementComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SigninModule,
        MusicInstrumentCardComponent,
        TheaterCardComponent,
        ReheasalRoomCardComponent,
        RecordingStudioCardComponent
    ]
})
export class AppModule { }
