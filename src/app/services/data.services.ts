import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { persons } from '../mock-data/persons';

@Injectable({
    providedIn: 'root',
})
export class DataService implements InMemoryDbService {
    constructor() {}
    createDb() {
        return { persons: [...persons] };
    }
}
