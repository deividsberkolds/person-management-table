import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonModalComponent } from './components/modals/add-person-modal/add-person-modal.component';
import { DeletePersonModalComponent } from './components/modals/delete-person-modal/delete-person-modal.component';
import { UpdatePersonModalComponent } from './components/modals/update-person-modal/update-person-modal.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
    {
        path: '',
        component: TableComponent,
        children: [
            {
                path: 'add',
                component: AddPersonModalComponent,
                data: { openModal: true },
            },
            {
                path: 'delete/:id',
                component: DeletePersonModalComponent,
            },
            {
                path: 'update/:id',
                component: UpdatePersonModalComponent,
            },
            {
                path: '**',
                component: TableComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
