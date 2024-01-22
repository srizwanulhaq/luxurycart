import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { WalletPackageListResponse } from "../domain/Dao/WalletPackages/WalletPackageDao";
import { ZonePackageListResponse } from "../domain/Dao/WalletPackages/ZonePackageDao";
import { EditWalletPackageDto, NewWalletPackageDto } from "../domain/Dto/WalletPackages/WalletPackageDto";

@Injectable()

export class WalletPackageService {
    constructor(private http: HttpClient) { }

    getWalletPackages(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        selectedProject:string,
        sortField: string,
        sortOrder: number
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminWalletPackages/getAllPackagesParams?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&selectedProject=${selectedProject}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as WalletPackageListResponse)
            .then(data => data);
    }

    toggleWalletPackage(data) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminWalletPackages/changeStatus`, data);
    }

    storeWalletPackage(data: NewWalletPackageDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminWalletPackages/savePackages`, data);
    }

    updateWalletPackage(data: EditWalletPackageDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminWalletPackages/updatePackages`, data);
    }
    getValidZones(packageId) {
        return this.http.get<ZonePackageListResponse>(`${environment.apiUrl}/api/v2/AdminWalletPackages/validZones?Package_Id=${packageId}`);
    }
}
