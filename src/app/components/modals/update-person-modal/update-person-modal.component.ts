import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-update-person-modal',
    templateUrl: './update-person-modal.component.html',
    styleUrls: ['./update-person-modal.component.scss'],
})
export class UpdatePersonModalComponent implements OnInit {
    constructor(protected personService: PersonService) {}

    personForm = this.personService.personForm;

    ngOnInit(): void {}
}
