import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateComponent } from './user/create/create.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './user/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateComponent,
    UserComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
