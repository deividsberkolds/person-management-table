import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-delete-person-modal',
    templateUrl: './delete-person-modal.component.html',
    styleUrls: ['./delete-person-modal.component.scss'],
})
export class DeletePersonModalComponent implements OnInit {
    constructor(
        protected personService: PersonService,
        protected modalService: ModalService
    ) {}

    ngOnInit(): void {}
}
