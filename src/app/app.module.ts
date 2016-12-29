import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { ConflictsService } from './shared/conflicts.service';
import { FormDataService } from './shared/form-data.service';
import { TimeListComponent } from './time-list/time-list.component';
import { DayViewComponent } from './day-view/day-view.component';
import { FormViewComponent } from './form-view/form-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    TimeListComponent,
    DayViewComponent,
    FormViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    FormDataService, 
    ConflictsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
