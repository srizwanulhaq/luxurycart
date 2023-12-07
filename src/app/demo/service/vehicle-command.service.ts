import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommandsResponse, GetAllCommandsResp, VehicleCommandDao } from '../domain/Dao/Vehicle/vehicle-commands';

@Injectable({
    providedIn: 'root'
})
export class VehicleCommandService {

    constructor(private _http: HttpClient) { }

    getAllCommands(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number) {
        return this._http.get<CommandsResponse>(`${environment.apiUrl}/api/v1/AdminVehicleCommand/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`);
    }

    getCommandsList() {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminVehicleCommand/getallcommands`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as GetAllCommandsResp)
            .then(data => data.data as VehicleCommandDao[]);
    }

    sendCommand(number: string, commandId: string, inputValue: string) {

        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Accept": "application/json" }),
        }

        return this._http.post<any>(`${environment.apiUrl}/api/v3/AdminVehicleCommand/SingleSend?number=${number}&command_id=${commandId}&input_value=${inputValue}`, HttpUploadOptions);
    }
}
