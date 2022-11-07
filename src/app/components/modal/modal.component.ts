import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'modal-popup',
    templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id!: string;
    private element: any;

    constructor(
        private modalService: ModalService,
        protected el: ElementRef,
        protected personService: PersonService,
        private router: Router
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            return;
        }

        this.element.addEventListener('click', function (e: any) {
            if (
                e.target.className === 'modal-popup' ||
                e.target.className === 'close-btn'
            ) {
                modal.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('modal-popup-open');
    }

    close(): void {
        this.router.navigate(['/']);

        this.element.style.display = 'none';
        document.body.classList.remove('modal-popup-open');
        this.personService.resetValues();
    }
}
