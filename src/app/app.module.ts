import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardService } from './card.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardNewComponent } from './card-new/card-new.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './login/login-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardDetailComponent,
    DashboardComponent,
    CardSearchComponent,
    CardNewComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

    //This need for mock-in-memory-data
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers:
    [CardService,
      MessageService,
      UserService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoginInterceptor,
        multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
