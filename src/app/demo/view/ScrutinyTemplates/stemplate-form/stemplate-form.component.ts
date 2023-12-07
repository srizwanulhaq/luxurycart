import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RideScrutinyTemplateDto } from 'src/app/demo/domain/Dto/RideScrutinyTemplate/ScrutinyTemplateDto';
import { RideScrutinyTemplateService } from 'src/app/demo/service/RideScrutinyTemplateService';

@Component({
    selector: 'app-stemplate-form',
    templateUrl: './stemplate-form.component.html',
    styleUrls: ['./stemplate-form.component.scss']
})
export class ScrutinyTemplateFormComponent implements OnInit {

    formMode: string
    @Input("rideScrutinyTemplate") rideScrutinyTemplate: RideScrutinyTemplateDto
    @Input("showModal") showModal: boolean
    submitted: boolean = false;
    rideForm;
    btnloading: boolean = false;
    @Output() eventChange = new EventEmitter<any>();
    @Output() closeForm = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder,
        private service: RideScrutinyTemplateService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef) {
        this.loadForm();
    }

    ngOnInit(): void { }

    ngOnChanges(change: SimpleChange) {
        if (!!change['showModal'].currentValue && !!change['rideScrutinyTemplate']?.currentValue) {
            this.rideForm.setValue({
                title: this.rideScrutinyTemplate.title,
                body: this.rideScrutinyTemplate.body
            })
        }
    }

    loadForm() {
        this.rideForm = this.formBuilder.group({
            title: ["", [Validators.required, Validators.min(3), Validators.max(255)]],
            body: ["", [Validators.required, Validators.min(3), Validators.max(255)]]
        });
    }

    resetAll() {
        this.submitted = false;
        this.closeForm.emit()
        this.rideForm.reset()
    }

    onSubmitData() {
        this.btnloading = true;
        if (this.rideForm.invalid) {
            this.btnloading = false;
            return;
        }
        const template = this.rideForm.value
        this.service.submitRideScrutinyTemplate(template, this.rideScrutinyTemplate?.id || "")
            .then(resp => {
                if (resp.status) {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    this.resetAll()
                    this.eventChange.emit(true)
                } else {
                    this.messageService.add({ severity: 'warning', summary: 'Failed', detail: resp.message, life: 3000 });
                }
            }).catch((e: any) => {
            }).finally(() => {
                this.btnloading = false;
            })
    }
}
