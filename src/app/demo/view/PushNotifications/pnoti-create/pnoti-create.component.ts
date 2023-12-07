import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { PushNotificationMainComponent } from '../pnoti-main/pnoti-main.component';
import { Subject } from 'rxjs';
import { CityDao, CountryDao, CustomerDao } from 'src/app/demo/domain/Dao/PushNotification/PushNotificationDao';
import { PushNotificationService } from 'src/app/demo/service/push-notification.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PushNotificationDto } from 'src/app/demo/domain/Dto/PushNotification/PushNotificationDto';
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-pnoti-create',
    templateUrl: './pnoti-create.component.html',
    styleUrls: ['./pnoti-create.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class PushNotificationCreateComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    countries: CountryDao[]
    cities: CityDao[] = []
    customers: CustomerDao[]
    loading: boolean = true;
    progressSpinner: boolean = false;
    pushNotificationForm: FormGroup;
    formsubmitted = false;
    btnloading: boolean
    selectTypes: Array<{ label: string, value: string }> = [
        { label: "Zones", value: "zone" },
        { label: "Customers", value: "customer" }
    ]

    constructor(private formBuilder: FormBuilder, public main: PushNotificationMainComponent,
        private service: PushNotificationService, private loaderService: LoaderService,
        private messageService: MessageService) {
        this.loadData()
    }

    ngOnInit(): void {
        this.pushNotificationForm = this.formBuilder.group({
            title: ["", [Validators.required, Validators.pattern('[A-Za-z 0-9]+'), Validators.maxLength(50)]],
            message: ["", [Validators.required, Validators.maxLength(100)]],
            selectedZones: [[], [Validators.required, Validators.minLength(1)]],
            radius: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
            selectedCustomers: [[]],
            selectedCountries: [[]],
            selectSendBy: ["zone"]
        });
    }

    changeType() {
        if (this.pushNotificationForm.controls["selectSendBy"].value == "zone") {
            this.pushNotificationForm.controls['selectedCustomers'].setValidators(null);

            this.pushNotificationForm.controls['selectedZones'].setValidators([Validators.required, Validators.minLength(1)]);
            this.pushNotificationForm.controls['radius'].setValidators([Validators.required, Validators.min(1)]);
        } else {
            this.pushNotificationForm.controls['selectedZones'].setValidators(null);
            this.pushNotificationForm.controls['radius'].setValidators(null);

            this.pushNotificationForm.controls['selectedCustomers'].setValidators([Validators.required, Validators.minLength(1)]);
        }
        this.resetForm(this.pushNotificationForm.value.selectSendBy)
    }

    loadData() {
        this.loading = true;
        this.service.getCountries().then(resp => {
            this.countries = resp.data.countries
            this.setCitiesList()
            this.loading = false
        })
    }

    setCitiesList() {
        let countries = this.countries
        if (this.pushNotificationForm.controls["selectedCountries"].value.length > 0) {
            countries = countries.filter((c: CountryDao) => this.pushNotificationForm.value.selectedCountries.indexOf(c.id) >= 0)
        }
        this.cities = countries.map((c: CountryDao) => c.cities).flat()
        this.pushNotificationForm.controls["selectedZones"].setValue([])
    }

    searchByMobile(event) {
        if (event.query.length > 4) {
            this.service.getCustomers(event.query).then(resp => {
                this.customers = resp.userphonedto
            })
        }
    }

    onSendPushNotification() {
        this.btnloading = true;
        if (this.pushNotificationForm.invalid) {
            this.btnloading = false;
            return;
        }
        const body: PushNotificationDto = {
            title: this.pushNotificationForm.value.title,
            message: this.pushNotificationForm.value.message,
        };
        if (this.pushNotificationForm.value.selectSendBy == "zone") {
            body["zoneids"] = this.pushNotificationForm.value.selectedZones
            body["radius"] = this.pushNotificationForm.value.radius
        } else {
            body["customerids"] = this.pushNotificationForm.value.selectedCustomers.map((c: CustomerDao) => c.code)
        }
        this.service.sendPushNotifications(body)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.status) {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.btnloading = false;
                        this.resetForm();
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                        this.btnloading = false;
                    }
                },
                error: (error) => {
                    this.btnloading = false;
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }

    resetForm(type: "zone" | "customer" = "zone") {
        this.formsubmitted = false;
        this.pushNotificationForm.reset();
        this.pushNotificationForm.controls["selectSendBy"].setValue(type)
    }
}


