import { Injectable } from '@angular/core';
import { Pagination, Person } from 'src/app/models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from './modal.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private personsUrl = 'api/persons/';
    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private modalService: ModalService,
        private router: Router
    ) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('add')) {
                    this.modalService.open('add-person-modal');
                } else if (event.url.includes('update')) {
                    const [, , id] = event.url.split('/');
                    if (id) {
                        this.fetchPersons().subscribe((persons) => {
                            this.person = persons.find(
                                (person) => person.id === +id
                            )!;
                            this.personForm.patchValue(this.person);
                            this.edit = false;
                            this.modalService.open('update-person-modal');
                        });
                    }
                } else if (event.url.includes('delete')) {
                    const [, , id] = event.url.split('/');
                    if (id) {
                        this.person.id = +id;
                        this.modalService.open('delete-person-modal');
                    }
                }
            }
        });
    }

    person: Person = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        ip_address: '',
    };
    edit = true;
    persons: Person[] = [];

    pagination: Pagination = {
        records: [],
        recordsInPage: 20,
        currentPage: 1,
        pageCount: [1],
    };

    personForm: FormGroup = this.fb.group({
        first_name: [
            '',
            { validators: [Validators.required], updateOn: 'change' },
        ],
        last_name: [
            '',
            { validators: [Validators.required], updateOn: 'change' },
        ],
        email: ['', { validators: [Validators.required], updateOn: 'change' }],
        gender: ['', { validators: [Validators.required], updateOn: 'change' }],
        ip_address: [
            '',
            { validators: [Validators.required], updateOn: 'change' },
        ],
    });

    private fetchPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(this.personsUrl).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    getPersons() {
        this.fetchPersons().subscribe((persons: Person[]) => {
            this.persons = persons;
            this.updatePageCount(persons);
            this.handlePagination(this.pagination.currentPage);
        });
    }

    createPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(this.personsUrl, person).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    editPerson(person: Person): Observable<any> {
        return this.http.put(this.personsUrl + person.id, person);
    }

    deletePerson(id: number): Observable<any> {
        return this.http.delete(this.personsUrl + id);
    }

    updatePerson() {
        if (this.personForm.valid) {
            this.editPerson({
                first_name: this.personForm.get('first_name')?.value,
                last_name: this.personForm.get('last_name')?.value,
                email: this.personForm.get('email')?.value,
                gender: this.personForm.get('gender')?.value,
                ip_address: this.personForm.get('ip_address')?.value,
                id: this.person.id,
            }).subscribe(() => this.getPersons());
            this.resetValues();
            this.modalService.close('update-person-modal');
        }
    }

    setRemovePerson(id: number) {
        if (id) {
            this.router.navigate([`delete/${id}`]);
        }
    }

    removePerson(id: number) {
        this.deletePerson(id).subscribe(() => this.getPersons());
        this.modalService.close('delete-person-modal');
    }

    clearInputs() {
        this.personForm.reset({
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            ip_address: '',
        });
        this.person.id = 0;
    }

    generateId() {
        return Math.max(...Array.from(this.persons, (person) => person.id)) + 1;
    }

    setEditPerson(person: Person) {
        this.router.navigate([`update/${person.id}`]);
    }

    resetValues() {
        this.clearInputs();
        this.edit = true;
    }

    openAddModal() {
        this.router.navigate(['add']);
    }
    addPerson() {
        if (this.personForm.valid) {
            this.createPerson({
                first_name: this.personForm.get('first_name')?.value,
                last_name: this.personForm.get('last_name')?.value,
                email: this.personForm.get('email')?.value,
                gender: this.personForm.get('gender')?.value,
                ip_address: this.personForm.get('ip_address')?.value,
                id: this.generateId(),
            }).subscribe((response) => {
                this.getPersons();
                this.persons = [...this.persons, response];
                this.handlePagination(this.pagination.currentPage);
                this.updatePageCount(this.persons);
                this.closeModal('add-person-modal');
                this.resetValues();
            });
        }
    }

    handlePagination(page: number) {
        this.pagination.records = this.persons.slice(
            this.pagination.recordsInPage * (page - 1),
            this.pagination.recordsInPage * page
        );
        this.pagination.currentPage = page;
    }

    openModal(modalId: string, clearInputs?: boolean) {
        this.modalService.open(modalId);

        if (clearInputs) {
            this.clearInputs();
            this.edit = true;
        }
    }
    closeModal(modalId: string) {
        this.modalService.close(modalId);

        this.resetValues();
    }

    updatePageCount(persons: Person[]) {
        this.pagination.pageCount = Array.from(
            { length: Math.ceil(persons.length / 20) },
            (_, i) => i + 1
        );
    }
}
