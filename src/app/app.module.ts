import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddPersonModalComponent } from './components/modals/add-person-modal/add-person-modal.component';
import { DeletePersonModalComponent } from './components/modals/delete-person-modal/delete-person-modal.component';
import { UpdatePersonModalComponent } from './components/modals/update-person-modal/update-person-modal.component';
import { DataService } from './services/data.services';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        ModalComponent,
        AddPersonModalComponent,
        UpdatePersonModalComponent,
        DeletePersonModalComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
