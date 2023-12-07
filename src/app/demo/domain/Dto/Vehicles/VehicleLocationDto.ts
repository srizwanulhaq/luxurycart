export interface VehicleLocationDto
{
    id?:string;
    vehicle_Id: string;
    latitude: number;
    longitude: number;
}
export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
  }