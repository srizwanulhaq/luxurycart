import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RidesResponse } from '../domain/Dao/Rides/Ridedao';
import { RideDetailsdaoResult } from '../domain/Dao/Rides/RideDetailsDao';
import { RidesVehicleHistoryResponse } from '../domain/Dao/Rides/RidePath';
import { RideTrack } from '../domain/Dao/Rides/RideTrack';
import { EndRideDto } from '../domain/Dto/Rides/EndRideDto';
import { NewRidedto } from '../domain/Dto/Rides/NewRideDto';


@Injectable()
export class RideService {


    constructor(private http: HttpClient) { }

    get(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        selectedProject:string,
        sortField: string,
        sortOrder: number,
        selectedStatus: number,
        dateRangeStr: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/v3/AdminRides/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&selectedProject=${selectedProject}&StatusValue=${selectedStatus}${dateRangeStr}`)
            .toPromise()
            .then(res => res as RidesResponse)
            .then(data => data.ridedto);
    }

    rideStart(ridedto: NewRidedto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminRides/Start`, ridedto);
    }

    ridesEndRecentLoc(vehicles: string[]) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/location-recent`, { "lstVhcls": vehicles });
    }

    vehiclesOutOfZoneRidesEnd(vehicles: string[], confirm: boolean) {
        const formData = new FormData();

        formData.append("dao", JSON.stringify({ "lstVhcls": vehicles, "endOutOfZone": confirm }));
        var dataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC";

        var byteString = atob(dataURI.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var blob = new Blob([ia], { type: "image/jpeg", });
        var file = new File([blob], "image.jpg");
        var reader = new FileReader();
        reader.readAsDataURL(file);

        formData.append("file", file, file.name);
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminRides/end-multiple`, formData);
    }

    rideEnd(endRide: EndRideDto) {
        const formData = new FormData();

        formData.append("ridedao", JSON.stringify(endRide));
        var dataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC";

        var byteString = atob(dataURI.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var blob = new Blob([ia], { type: "image/jpeg", });
        var file = new File([blob], "image.jpg");

        var reader = new FileReader();

        var file1 = reader.readAsDataURL(file);
        formData.append("file", file, file.name);

        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminRides/AdminRideEnd`, formData);
    }
    getRideDetails(ride_Id, customer_Id) {
        return this.http.get<RideDetailsdaoResult>(`${environment.apiUrl}/api/v2/AdminRides/rideDetails?ride_Id=${ride_Id}&customer_Id=${customer_Id}`);
    }

    onGoingRideTracking(vehicleId: string) {
        return this.http.get<RideTrack>(`${environment.apiUrl}/api/v1/AdminRides/onGoingRideTracking?vehicleId=${vehicleId}`
        );
    }

    getRideVehicleHistory(rideId: string) {
        return this.http.get<RidesVehicleHistoryResponse>(`${environment.apiUrl}/api/v1/AdminVehicles/RideHistory?rideId=${rideId}`);
    }
    editheadCount(data:any){
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminRides/update`, data);
    }

}
