import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardService } from './card.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    MessageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CardService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
