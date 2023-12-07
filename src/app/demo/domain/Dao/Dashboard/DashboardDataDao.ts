export class DashboardRidesDataResponse {
    status: string
    message: string
    data: DashboardRidesDataDao
}

export class ZoneStats {
    zoneTitle: string
    rideCount: number
}

export class CompanyStats {
    vehicleCompany: string
    vehicleType: string
    rideCount: number
}

export class PackageStats {
    packageTitle: string
    packagePurchaseCount: number
}

export class PeakHourStats {
    hoursSlab: string
    rideCount: number
}

export class VehicleTypeStats {
    vehicleType: string
    rideCount: number
}

export class ModeStats {

    mode:string;
    amount:number;

}


export class DashboardRidesDataDao {
    activeShouldBeOnMapVehicles: number
    needInvestigation: number
    charging: number
    outofservice: number
    totalOutOfTheZoneNotInUseVal: number
    totalRides: number
    totalActiveRides: number
    totalRidesSar: number
    totalTopUp: number
    totalWalletRevenue: number
    totalBonusRevenue: number
    totalDebitAmount: number
    avgRevPerScooter: number
    totalOfflineVehiclesVal: number
    totalDischargedVehiclesVal: number
    totalUrgentInvestigationVal: number
    totalOutOfTheZoneInUseVal: number
    vehiclesAvailable: number
    vehiclesInUse: number
    vehiclesLowBattery: number
    bonus:number;
    bank_Transfer:number;
    cash:number;
    pos:number;
    apple_Pay:number;
    total_wallet:number;
    zoneStats: ZoneStats[]
    packageStats: PackageStats[]
    peakHourStats: PeakHourStats[]
    companyStats: CompanyStats[]
    vehicleTypeStats: VehicleTypeStats[]
    modeRevenue: ModeStats[]
    finishedRideStatus: number
    vehicleStatusEnum: Array<{
        number: number,
        title: string
    }>
}
