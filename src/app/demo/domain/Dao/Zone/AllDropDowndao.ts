import { WalletPackageDao } from "../WalletPackages/WalletPackageDao";

export class AllDropDownResult {
    message: string;
    result: AllDropDownDao;
    status: boolean;
}

export class AllDropDownDao {
    lstZoneTypes: zoneTypedao[];
    lstRideTypes: rideTypedao[];
    lstCompanies: vCompanydao[];
    lstRideTemplates:RideTemplatedao[];
    lstWalletPackages: WalletPackageDao[];

}

export class zoneTypedao {
    label: string;
    value: string;
}
export class rideTypedao {
    label: string;
    value: string;
}
export class vCompanydao {
    label: string;
    value: string;
}
export class RideTemplatedao {
    label: string;
    value: number;
}

export class ZoneStatsDao {
    zoneId: string
    zoneTitle: string
    onlineMinsWithInZone: number
    onlineMinsOutOfZone: number
}


