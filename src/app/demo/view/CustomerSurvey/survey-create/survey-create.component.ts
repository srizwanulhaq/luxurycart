import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SurveyMainComponent } from '../survey-main/survey-main.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { CustomerSurveyService } from 'src/app/demo/service/customer-survey.service';
import { AddCustomerSurvey } from 'src/app/demo/domain/Dto/CustomerSurvey/add-customer-survey';
import { first } from 'rxjs/operators';
import { Dropdown } from 'primeng/dropdown';

@Component({
    selector: 'app-survey-create',
    templateUrl: './survey-create.component.html',
    styleUrls: ['./survey-create.component.scss'],
    providers: [MessageService],
})
export class SurveyCreateComponent implements OnInit {

    surveyDialog: boolean;
    submitted: boolean;
    btnloading: boolean;
    surveyForm: any;
    ganders: any[];
    rideDirections: any[];
    ages: any[];
    yesNo: any[];
    qualityOfTrackFloor: number = 0;
    qualityOfLighting: number = 0;
    qualityOfPickupZone: number = 0;
    qualityOfDepartureZone: number = 0;
    sustainabilityOfScooterSpeed: number = 0;
    scooterPickupProcess: number = 0;
    scooterDropOffProcess: number = 0;
    satisfiedExperince: number = 0;
    supportProvisionOfScooter: number = 0;
    qualityOfScooterCondition: number = 0;
    countries: any[];
    lstTypes: SelectItem[] = [];
    nationality: string;
    selectedLang: string = "English"
    languages: Array<{ label: string, value: string }> = [
        { label: "Arabic", value: "Arabic" },
        { label: "Urdu", value: "Urdu" },
        { label: "Spanish", value: "Spanish" },
        { label: "Turkish", value: "Turkish" },
        { label: "Russian", value: "Russian" },
        { label: "Persian", value: "Persian" },
        { label: "Bengali", value: "Bengali" },
        { label: "Indonesian", value: "Indonesian" },
        { label: "Malay", value: "Malay" },
        { label: "German", value: "German" },
        { label: "French", value: "French" },
        { label: "English", value: "English" },
    ].sort((a, b) => a.label > b.label ? 1 : -1)
    locale = {
        Urdu: [
            // "قومیت",
            "Nationality",
            "اس سروس کو پہلے استعمال کیا؟",
            // "جنس",
            "Gender",
            // "سواری کی سمت",
            "Ride direction",
            // "عمر",
            "Age",
            // "شیشے پہنے ہوئے تھے؟",
            "Wear glasses",
            "سکوٹر کا پہلے سے علم؟",
            "استعمال شدہ سکوٹر کی قسم",
            "ٹریک فلور کا معیار",
            "لائٹنگ کا معیار",
            "پک اپ ایریا کی تنظیم کا معیار",
            "روانگی زون کی تنظیم کا معیار",
            "کسی خاص راستے کے لیے سکوٹر کی رفتار کی مناسبیت",
            "روانگی زون میں سکوٹر پک اپ کے عمل میں آسانی",
            "ڈیلیوری زون میں سکوٹر کے ڈراپ آف عمل میں آسانی",
            "کیا آپ آنے والے سالوں میں صارفین کے لیے فیس کے ساتھ سکوٹر سروس کی فراہمی کی حمایت کرتے ہیں",
            "استعمال شدہ سکوٹر کا معیار",
            "آپ تجربے سے کتنے مطمئن ہیں",
            "جی ہاں",
            "نہیں",
            "عورت",
            "مرد",
            "حرم-مینا",
            "مینا-حرم"
        ],
        Spanish: [
            // "Nacionalidad",
            "Nationality",
            "¿Ha utilizado este servicio anteriormente",
            // "Género",
            "Gender",
            // "Dirección del trayecto",
            "Ride direction",
            // "Edad",
            "Age",
            // "Gözlük kullanıyor musunuz",
            "Wear glasses",
            "Scooter hakkında önceden bilgi sahibi olmak",
            "Kullanılan scooter türü",
            "Calidad del piso de la pista",
            "Calidad de iluminación",
            "Calidad de la organización de la zona de recogida",
            "Calidad de la organización de la zona de partida",
            "Adecuación de la velocidad del scooter para una ruta en particular",
            "Facilidad del proceso de recogida del scooter en la zona de partida",
            "Facilidad del proceso de devolución del scooter en la zona de entrega",
            "¿Apoyas la provisión del servicio de scooters en los próximos años con una tarifa para los usuarios?",
            "La calidad del estado del scooter usado",
            "¿Qué tan satisfecho estás con la experiencia",
            "Sí",
            "No",
            "Mujer",
            "Hombre",
            "Haram-Mina",
            "Mina-Haram"
        ],
        Turkish: [
            // "Milliyet",
            "Nationality",
            "Daha önce bu hizmeti kullandınız mı",
            // "Cinsiyet",
            "Gender",
            // "Sürüş yönlendirmesi",
            "Ride direction",
            // "Yaş",
            "Age",
            // "Gözlük kullanıyor musunuz",
            "Wear glasses",
            "Scooter hakkında önceden bilgi sahibi olmak",
            "Kullanılan scooter türü",
            "Pist zemin kalitesi",
            "Aydınlatma Kalitesi",
            "Alma bölgesinin düzen kalitesi",
            "Kalkış bölgesinin düzen kalitesi",
            "Belirli bir rota için scooter hızının uygunluğu",
            "Kalkış bölgesinde scooter alma sürecinin kolaylığı",
            "Teslim bölgesinde scooter teslim sürecinin kolaylığı",
            "Gelecek yıllarda kullanıcılar için ücretli scooter hizmeti sağlanmasını destekliyor musunuz",
            "Kaliteli ikinci el scooter",
            "Deneyimden ne kadar memnunsunuz",
            "Evet",
            "Hayır",
            "Kadın",
            "Erkek",
            "Harem-Mina",
            "Mina-Harem"
        ],
        Russian: [
            // "Национальность",
            "Nationality",
            "Ранее пользовались данным сервисом",
            // "Пол",
            "Gender",
            // "Направление поездки",
            "Ride direction",
            // "Возраст",
            "Age",
            // "Носите очки",
            "Wear glasses",
            "Предварительные знания о скутере",
            "Тип использованного скутера",
            "Качество дорожного покрытия",
            "Качество освещения",
            "Качество организации зоны получения",
            "Качество организации зоны отправления",
            "Подходящая скорость скутера для конкретного маршрута",
            "Удобство процесса получения скутера в зоне отправления",
            "Удобство процесса сдачи скутера в зоне доставки",
            "Поддерживаете ли вы предоставление услуги проката скутеров в следующие годы за плату для пользователей",
            "Качественный подержанный скутер",
            "На сколько удовлетворены опытом использования",
            "Да",
            "Нет",
            "Женщина",
            "Мужчина",
            "Харам-Мина",
            "Мина-Харам"
        ],
        Persian: [
            // "تابع یت",
            "Nationality",
            "قبلا از این سرویس استفاده کرده اید؟",
            // "جنسیت",
            "Gender",
            // "جهت سواری",
            "Ride direction",
            // "سن",
            "Age",
            // "عینک زده بود؟",
            "Wear glasses",
            "دانش قبلی از اسکوتر؟",
            "نوع اسکوتر مورد استفاده",
            "کیفیت کف پیست",
            "کیفیت نورپردازی",
            "کیفیت سازمان منطقه پیکاپ",
            "کیفیت سازمان منطقه خروج",
            "مناسب بودن سرعت اسکوتر برای یک مسیر خاص",
            "سهولت فرآیند پیکاپ اسکوتر در منطقه عزیمت",
            "سهولت فرآیند رها کردن اسکوتر در منطقه تحویل",
            "آیا از ارائه خدمات اسکوتر در سال های آینده با هزینه برای کاربران حمایت می کنید؟",
            "کیفیت وضعیت اسکوتر مورد استفاده",
            "چقدر از تجربه راضی هستید",
            "بله",
            "خیر",
            "زن",
            "مرد",
            "حرم-منا",
            "منا-حرم"
        ],
        Bengali: [
            // "জাতীয়তা",
            "Nationality",
            "আগে এই সেবা বযবহার কগরগেন কক",
            // "কলঙ্গ",
            "Gender",
            // "রাইড কিক",
            "Ride direction",
            // "বয়ে",
            "Age",
            // "অক্ষমতা সিখা যায়",
            "Wear glasses",
            "স্কু টাগরর পূব বজ্ঞান",
            "বযবহৃত স্কু টাগরর ধরণ",
            "ট্র্যাক সলাগরর গুণেত মান",
            "আলোর গুণমান",
            "উদ্ধার অঞ্চগলর েংেঠগনর গুনেতমান",
            "প্রস্থান অঞ্চগলর েংেঠগনর গুনেতমান",
            "কনকিবষ্ট মাগে বর জনয স্কু টার েকতগত  োমঞ্জেয",
            "প্রস্থান অঞ্চগল স্কু টার উদ্ধার প্রক্রিয়ার েহজতা",
            "েরবরাহ অঞ্চগল স্কু টার সেরত সিয়ার প্রক্রিয়ার েহজতা",
            "আগ আগে আেগে আোমী বেরগুকলগত বযবহারকারীগির জনয স্কু টার সেবা প্রিান করাগক আপকন েমর্ বন করগেন কক",
            "মানের ব্যবহৃত স্কুটার",
            "আপকন কতখাকন েন্তুষ্ট অকিজ্ঞতা রইগলন",
            "হযাাঁ",
            "না",
            "মকহলা",
            "পুরুষ",
            "হারাম-কমনা",
            "কমনা-হারাম"
        ],
        Indonesian: [
            // "Kebangsaan",
            "Nationality",
            "Pernah menggunakan layanan ini sebelumnya",
            // "Jenis kelamin",
            "Gender",
            // "Arah perjalanan",
            "Ride direction",
            // "Usia",
            "Age",
            // "Memakai kacamata",
            "Wear glasses",
            "Pengetahuan sebelumnya tentang skuter",
            "Jenis skuter yang digunakan",
            "Kualitas lantai lintasan",
            "Kualitas Pencahayaan",
            "Kualitas organisasi zona pengambilan",
            "Kualitas organisasi zona keberangkatan",
            "Kesesuaian kecepatan skuter untuk rute tertentu",
            "Kemudahan proses pengambilan skuter di zona keberangkatan",
            "Kemudahan proses pengembalian skuter di zona pengantaran",
            "Apakah Anda mendukung penyediaan layanan skuter dalam beberapa tahun mendatang dengan biaya untuk pengguna",
            "Skuter bekas berkualitas",
            "Seberapa puas Anda dengan pengalaman ini",
            "Ya",
            "Tidak",
            "Perempuan",
            "Laki-laki",
            "Haram-Mina",
            "Mina-Haram"
        ],
        Malay: [
            // "Kebangsaan",
            "Nationality",
            "Pernah menggunakan perkhidmatan ini sebelum ini",
            // "Jantina",
            "Gender",
            // "Arah perjalanan",
            "Ride direction",
            // "Umur",
            "Age",
            // "Memakai cermin mata",
            "Wear glasses",
            "Pengetahuan sebelumnya mengenai skuter",
            "Jenis skuter yang digunakan",
            "Kualitas lantai trek",
            "Kualiti Pencahayaan",
            "Kualitas organisasi zona pengambilan",
            "Kualitas organisasi zona keberangkatan",
            "Kesesuaian kecepatan skuter untuk rute tertentu",
            "Kemudahan proses pengambilan skuter di zona keberangkatan",
            "Kemudahan proses pengembalian skuter di zona pengiriman",
            "Apakah Anda mendukung penyediaan layanan skuter pada tahun-tahun mendatang dengan biaya bagi pengguna",
            "Skuter terpakai berkualiti",
            "Seberapa puas Anda dengan pengalaman ini",
            "Ya",
            "Tidak",
            "Wanita",
            "Lelaki",
            "Haram-Mina",
            "Mina-Haram"
        ],
        German: [
            // "Nationalität",
            "Nationality",
            "Haben Sie diesen Service zuvor genutzt",
            // "Geschlecht",
            "Gender",
            // "Richtung der Fahrt",
            "Ride direction",
            // "Alter",
            "Age",
            // "Tragen Sie eine Brille",
            "Wear glasses",
            "Vorkenntnisse über Roller",
            "Der Typ des verwendeten Rollers",
            "Qualität des Streckenbodens",
            "Qualität der Organisation der Abholzone",
            "Qualität der Beleuchtung",
            "Qualität der Organisation der Abfahrtszone",
            "Eignung der Roller-Geschwindigkeit für eine bestimmte Strecke",
            "Leichtigkeit des RollerAbholprozesses an der Abfahrtszone",
            "Leichtigkeit des RollerAbgabeprozesses an der Lieferzone",
            "Unterstützen Sie die Bereitstellung des Roller-Services in den kommenden Jahren gegen Gebühr für Benutzer",
            "Hochwertiger gebrauchter Roller",
            "Wie zufrieden sind Sie mit der Erfahrung",
            "Ja",
            "Nein",
            "Frau",
            "Mann",
            "Haram-Mina",
            "Mina-Haram"
        ],
        French: [
            // "Nationalité",
            "Nationality",
            "Avez-vous déjà utilisé ce service auparavant",
            // "Sexe",
            "Gender",
            // "Sens de trajet",
            "Ride direction",
            // "Âge",
            "Age",
            // "Portez-vous des lunettes",
            "Wear glasses",
            "Connaissance préalable du scooter",
            "Type de scooter utilisé",
            "Qualité du revêtement de la piste",
            "Qualité de l'éclairage",
            "Qualité de l'organisation de la zone de récupération",
            "Qualité de l'organisation de la zone de départ",
            "Adéquation de la vitesse du scooter pour un itinéraire particulier",
            "Facilité du processus de récupération du scooter dans la zone de départ",
            "Facilité du processus de retour du scooter dans la zone de livraison",
            "Soutenez-vous la fourniture d'un service de scooter avec des frais pour les utilisateurs dans les années à venir",
            "Qualité de l'état du scooter utilisé",
            "Dans quelle mesure êtes-vous satisfait de l'expérience",
            "Oui",
            "Non",
            "Femme",
            "Homme",
            "Haram-Mina",
            "Mina-Haram"
        ],
        English: [
            "Nationality",
            "Used this service before",
            "Gender",
            "Ride direction",
            "Age",
            "Wear glasses",
            "Prior knowledge of scooter",
            "The type of scooter used",
            "The quality of the track floor",
            "Quality Of Lighting",
            "Quality of the pickup zone organization",
            "Quality of departure zone organization",
            "The suitability of scooter speed for a particular route",
            "The ease of the scooter pickup process at the departure zone",
            "The ease of the scooter drop-off process at the delivery zone",
            "Do you support the provision of scooter service in the coming years with a fee for users",
            "The quality of the condition of the scooter used",
            "How satisfied are you with the experience",
            "Yes",
            "No",
            "Female",
            "Male",
            "Haram-Mina",
            "Mina-Haram"
        ],
        Arabic: [
            "الجنسية",
            "استخدام الخدمة مسبقا",
            "الجنس",
            "اتجاه الرحلة",
            "العمر",
            "ارتداء النظارات",
            "المعرفة المسبقة بالسكوتر",
            "نوع السكوتر المستخدم",
            "جودة أرضية الجنزير",
            "جودة الإضاءة",
            "جودة تنظيم منطقة التسليم",
            "جودة تنظيم منطقة الانطلاق",
            "مدى مناسبة سرعة السكوتر للمسار",
            "مدى سهولة عملية استلام السكوتر في منطقة الانطلاق",
            "مدى سهولة عملية تسليم السكوتر في منطقة التسليم",
            "هل تؤيد تقديم خدمة السكوتر في الأعوام القادمة برسوم على المستخدمين",
            "حالة جودة السكوتر المستعمل",
            "ما مدى رضاك ​​عن التجربة",
            "نعم",
            "لا",
            "انثى",
            "ذكر",
            "الحرم-منى",
            "منى-الحرم"
        ]
    }

    constructor(public main: SurveyMainComponent,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        private service: CustomerSurveyService,
        private messageService: MessageService,) { }

    @Output() eventChange = new EventEmitter<Event>();

    ngOnInit(): void {
        this.loadForm();
        this.loadValues();
        this.getCountries();
        this.loadDropdownValues()
    }
    openNew() {
        this.submitted = false;
        this.surveyDialog = true;
        this.main.event = null;
        this.resetForm();
    }

    loadValues() {

        this.ganders = [
            { name: this.locale[this.selectedLang][21], key: 'Male' },
            { name: this.locale[this.selectedLang][20], key: 'Woman' },
        ];
        this.rideDirections = [

            { name: this.locale[this.selectedLang][22], key: 'Haram-Mina' },
            { name: this.locale[this.selectedLang][23], key: 'Mina-Haram' },
        ];
        this.yesNo = [
            { name: this.locale[this.selectedLang][18], key: true },
            { name: this.locale[this.selectedLang][19], key: false },
        ];

        this.ages = [

            { name: '< 41', key: '< 41' },
            { name: '21-30', key: '21-30' },
            { name: '< 20', key: '(21-30)' },
        ];

    }

    resetForm() {
        this.surveyForm.reset();
        this.btnloading = false;
    }
    loadForm() {
        this.surveyForm = this._formBuilder.group({
            vehicle_Type_Id: [""],
            gender: [''],
            rideDirection: [],
            ageBracket: [],
            isWearingGlasses: [],
            haveScooterKnowledge: [],
            isServiceAlreadyUsed: [],
            qualityOfTrackFloor: [],
            qualityOfLighting: [],
            qualityOfPickupZone: [],
            qualityOfDepartureZone: [],
            sustainabilityOfScooterSpeed: [],
            scooterPickupProcess: [],
            scooterDropOffProcess: [],
            satisfiedExperince: [],
            supportProvisionOfScooter: [],
            qualityOfScooterCondition: [],
            nationality: []
        });
    }
    onSubmitForm() {
        this.btnloading = true;
        if (this.surveyForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.surveyForm.value.nationality = this.nationality;
        this.addNewSurvey(this.surveyForm.value);
    }
    addNewSurvey(survey: AddCustomerSurvey) {

        this.service.saveVehicle(survey).pipe(first())
            .subscribe({
                next: (response) => {
                    this.resetForm();
                    this.surveyDialog = false;
                    if (response.status) {
                        this.eventChange.emit(response.status);
                        this.setvalue();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.btnloading = false;
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }

    getCountries() {

        this.http.get('https://trial.mobiscroll.com/content/countries.json').subscribe((resp: any) => {
            const lstCountries = [];
            for (let i = 0; i < resp.length; ++i) {
                const country = resp[i];
                lstCountries.push({ name: country.text, code: country.value });
            }
            this.countries = lstCountries;
        });

    }

    loadDropdownValues() {
        this.service.loadVehicleTypes().then(responseList => {
            this.lstTypes = responseList.lstTypes;

        });
    }

    getNationalityName(name: Dropdown) {
        this.nationality = name.selectedOption.name;
    }
    setvalue() {
        this.qualityOfTrackFloor = 0;
        this.qualityOfLighting = 0;
        this.qualityOfPickupZone = 0;
        this.qualityOfDepartureZone = 0;
        this.sustainabilityOfScooterSpeed = 0;
        this.qualityOfScooterCondition = 0;
        this.scooterPickupProcess = 0;
        this.scooterDropOffProcess = 0;
        this.satisfiedExperince = 0;
        this.supportProvisionOfScooter = 0;
    }

    changeLang(e) {
        if (e.value != this.selectedLang) {
            this.selectedLang = e.value
            this.ganders[0].name = this.locale[this.selectedLang][21]
            this.ganders[1].name = this.locale[this.selectedLang][20]
            this.rideDirections[0].name = this.locale[this.selectedLang][22]
            this.rideDirections[1].name = this.locale[this.selectedLang][23]
            this.yesNo[0].name = this.locale[this.selectedLang][18]
            this.yesNo[1].name = this.locale[this.selectedLang][19]
        }
    }
}
