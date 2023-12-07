import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewVisitPlaceDao } from 'src/app/demo/domain/Dao/VisitPlaces/NewVisitPlaceDao';
import { ZoneDao } from 'src/app/demo/domain/Dao/VisitPlaces/ZoneDao';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { VisitPlaceService } from 'src/app/demo/service/visitPlace.service';

@Component({
  selector: 'app-visit-place-create',
  templateUrl: './visit-place-create.component.html',
  styleUrls: ['./visit-place-create.component.scss'],
  providers: [MessageService]
})
export class VisitPlaceCreateComponent implements OnInit {
  
  visitPlaceDialog:boolean;
  submitted: boolean;
  visitPlaceForm;
  parkingZone:ZoneDao[] = [];
  btnloading:boolean;
  images: any[] = [];
  imagesFile: any[] = [];
  units: any = [];
  smallImageData:any;
  currentlat: number = 0;
  currentlng: number = 0;


  constructor( private _packageDiscountService: PackagediscountService,
    private _formBuilder: FormBuilder, 
    private messageService: MessageService,
    private service:VisitPlaceService) { }

  ngOnInit(): void {
    this.loadForm();
  }
  @Output() eventChange = new EventEmitter<Event>();
  newVisitPlace() {
    this.visitPlaceDialog = true;
    this.getparkingzones();
    this.images = [];
    this.setCurrentPosition();

}

onSubmitForm(){
  this.submitted = true;
  this.addNewPlace(this.visitPlaceForm.value);
}
addNewPlace(place: any) {
  const formData = new FormData();
  place.image.forEach(item => {
      formData.append('fileSource', item);
     });
  place.zoneIds.forEach((value,index) => { 
    formData.append(`zoneIds[${index}]`, value.id); 
   });
  formData.append('defaultImage',this.smallImageData);
  formData.append('title',place.title);
  formData.append('arTitle',place.arTitle);
  formData.append('sub_Title',place.sub_title);
  formData.append('sub_ArTitle',place.sub_arTitle);
  formData.append('address',place.address);
  formData.append('rating',place.rating);
  formData.append('short_Description',place.short_Description);
  formData.append('long_Description',place.long_Description);
  formData.append('latitude',  place.latitude.toString()); 
  formData.append('longitude',  place.longitude.toString());
  
  this.service.savePlace(formData).pipe(first())
    .subscribe({
      next: (response) => {
        this.resetForm();
        this.visitPlaceDialog = false;        
        if (response.status) {
          this.eventChange.emit(response.status);
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
loadForm() {
  this.visitPlaceForm = this._formBuilder.group({
    title: ['', [Validators.required]],
    arTitle: ['',[Validators.required]],
    sub_title: ['', [Validators.required]],
    sub_arTitle: ['',[Validators.required]],
    rating: ['', [Validators.required]],
    address: ['',[Validators.required]],
    latitude: [ ,[Validators.required]],
    longitude: [ ,[Validators.required]],
    short_Description:['',[Validators.required, Validators.maxLength(20)]],
    long_Description: ['',[Validators.required ,Validators.maxLength(100)]],
    zoneIds:[],
    file: [],
    image: ['', Validators.required],
  });
}
resetForm() {
  this.visitPlaceForm.reset();
  this.btnloading = false;
}
getparkingzones() {
  this._packageDiscountService.getparkingzones()
      .subscribe(resp => {
        this.parkingZone = resp.data;        
      });
}
onFileChange(event: any) {
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    if(filesAmount <=5){
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      if(event.target.files[i].size <= 2000000){
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
        this.imagesFile.push(event.target.files[i]);
        this.patchValues();
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Image can not be larger than 2 mp', life: 2000 });
      }

    }
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Image can not be greater than five', life: 2000 });
  }
  }
  
}
onunitType(id: number) {
  let i = id.toString();
  this.visitPlaceForm.patchValue({ unitType: i });
}
// Patch form Values
patchValues() {
  this.visitPlaceForm.patchValue({
    image: this.imagesFile,
  });
}

// Remove Image
removeImage(url: any, index: number) {
  this.images = this.images.filter((img) => img != url);
  this.imagesFile.splice(index, 1);
  this.patchValues();
}
onFileSelected(event:any) {
  const file: File = event.target.files[0];
  if(event.target.files[0].size <= 2000000){
    if(file){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const height = image.height;
          const width = image.width;
          this.smallImageData = event.target.files[0]
        };
      }
      reader.readAsDataURL(file);
      this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'File Uploaded', life: 3000 });
    }
  }
 
  else{
    this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Image can not be larger than 2 mp', life: 2000 });
  }
  
}
private setCurrentPosition() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentlat = position.coords.latitude;
      this.currentlng = position.coords.longitude;
    });
  }
}
}
