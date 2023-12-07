export class ZonePackageListResponse {
    status: string
    message: string
    validZones: ListZonePackage
}

export class ListZonePackage {
    data: ZonePackageDao[]
    totalCount: number
}

export class ZonePackageDao {
    id: string
    Parking_Zone:ParkingZones
}

export class ParkingZones{
    id: string;
    Title:string;
    Number:string;
}

export class GetWalletPackageIdDao {
    id: string
}
