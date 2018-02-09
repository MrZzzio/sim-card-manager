import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardService } from './card.service';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardNewComponent } from './card-new/card-new.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    DashboardComponent,
    CardSearchComponent,
    CardNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [CardService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
