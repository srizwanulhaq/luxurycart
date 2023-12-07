import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { VisitPlaceMainComponent } from '../visit-place-main/visit-place-main.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitPlaceDto } from 'src/app/demo/domain/Dto/VisitPlaces/VisitPlaceDto';
import { MessageService } from 'primeng/api';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { ZoneDao } from 'src/app/demo/domain/Dao/VisitPlaces/ZoneDao';
import { VisitPlaceService } from 'src/app/demo/service/visitPlace.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-visit-place-edit',
  templateUrl: './visit-place-edit.component.html',
  styleUrls: ['./visit-place-edit.component.scss'],
  providers: [MessageService]
})
export class VisitPlaceEditComponent implements OnInit {

  visitPlaceFormEdit;
  @Input() editPlaceData: VisitPlaceDto;
  parkingZone:ZoneDao[] = [];
  selectedParkingZone:ZoneDao[];
  images: any[] = [];
  imagesFile: any[] = [];
  units: any = [];
  filedata:any;
  btnloading:boolean;
  oldImages: any[] = [];
  newSmallImageData:any;
  oldDefaultImage:string;
  submitted:boolean;
 
  
  constructor(public main:VisitPlaceMainComponent,private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private _packageDiscountService: PackagediscountService,
    private service:VisitPlaceService) { }

  ngOnInit(): void {
    this.loadForm();
    this.getparkingzones();
  }
  @Output() eventChange = new EventEmitter<Event>();

  loadForm() {
    this.visitPlaceFormEdit = this._formBuilder.group({
      id:[''],
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
      lstOldImages:[],
      oldDefaultImage:[],
    });
  }
  onSubmitForm() {
    this.submitted = true;
    this.setValue();
    this.editVisitPlace(this.visitPlaceFormEdit.value)
}
editVisitPlace(place: any) {

  const formData = new FormData();
  
    if(place.image.length > 0){
      place.image.forEach(item => {
        formData.append('lstnewImages', item);
       });
    }
 
   place.zoneIds.forEach((value,index) => { 
    formData.append(`zoneIds[${index}]`, value.id); 
   });
   place.lstOldImages.forEach((old,index) => { 
    formData.append(`lstOldImages[${index}]`, old.image); 
   });
   if(this.oldDefaultImage != null)
    {
      formData.append('oldDefaultImage',this.oldDefaultImage);
      formData.append('newDefaultImage',this.newSmallImageData);
    }
   else{
    formData.append('newDefaultImage',this.newSmallImageData);
    formData.append('oldDefaultImage',this.oldDefaultImage);
   }
 
  formData.append('id',place.id);
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

  
    this.service.updatePlace(formData).pipe(first())
        .subscribe({
            next: (response) => {
                this.main.editPanelActive = false;
                this.main.bottomPanelActive = false;
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
setValue() {
  this.visitPlaceFormEdit.value.lstOldImages = this.oldImages;
  
  this.visitPlaceFormEdit.value.oldDefaultImage = this.oldDefaultImage;


}
  ngOnChanges(change: SimpleChange) {
    if (!!change['editPlaceData'].currentValue) {
        const temp = change['editPlaceData'].currentValue;
        const group: FormGroup = this.visitPlaceFormEdit as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['title'].setValue(temp.title || "");
        group.controls['arTitle'].setValue(temp.arTitle || "");
        group.controls['sub_title'].setValue(temp.sub_Title || "");
        group.controls['sub_arTitle'].setValue(temp.sub_ArTitle || "");
        group.controls['address'].setValue(temp.address || "");
        group.controls['rating'].setValue(temp.rating || 0);
        group.controls['latitude'].setValue(temp.latitude || 0);
        group.controls['longitude'].setValue(temp.longitude || 0);
        group.controls['short_Description'].setValue(temp.short_Description || "");
        group.controls['long_Description'].setValue(temp.long_Description || "") ;

        var lstplacesImages = [];
        temp.visitPlaceImagesList
        .forEach(function (value, index) {
          lstplacesImages.push(value.image);
        });
        this.images = lstplacesImages;
        this.oldImages = temp.visitPlaceImagesList;

        this.oldDefaultImage = temp.default_Image;

        this.selectedParkingZone = [];
        temp.zoneVisitPlacesList.forEach(zone =>  {
          this.selectedParkingZone.push(zone.parkingZone);
        });
    }
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
  this.visitPlaceFormEdit.patchValue({ unitType: i });
}
// Patch form Values
patchValues() {
  this.visitPlaceFormEdit.patchValue({
    image: this.imagesFile,
  });
}

// Remove Image
removeImage(url: any, index: number) {
  
  this.images = this.images.filter((img) => img != url);
  this.oldImages = this.oldImages.filter(x => x.image  != url);
  this.oldImages.splice(index,1);
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
          this.newSmallImageData = event.target.files[0]
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

removeDefaultImage(url: any){
  this.oldDefaultImage = null; 
}
}
