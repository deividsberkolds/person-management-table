import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-add-person-modal',
    templateUrl: './add-person-modal.component.html',
    styleUrls: ['./add-person-modal.component.scss'],
})
export class AddPersonModalComponent implements OnInit {
    constructor(protected personService: PersonService) {}

    personForm = this.personService.personForm;

    ngOnInit() {}
}
