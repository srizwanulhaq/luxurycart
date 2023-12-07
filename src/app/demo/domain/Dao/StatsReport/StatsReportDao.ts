export class SellingPackage {
    packageTitle: string
    packagePurchaseCount: number
}

export class PurchaseRate {
    packageTitle: string
    packagePurchasePercent: number
}

export class RevenuePackage {
    packageTitle: string
    purchaseAmountTotal: number
}

export class CompanyRevenue {
    companyName: string
    amount: number
}

export class Platform {
    platform: string
    rideCount: number
}

export class PlatformCompany {
    companyName: string
    platform: string
    rideCount: number
}

export class MostRevenuePackageRate {
    packageTitle: string
    revenuePercent: number
}

export class RidesRating {
    rating: string
    rideCount: number
}

export class RideStats {
    companyRevenue: CompanyRevenue
    platform: Platform
    platformCompany: PlatformCompany
    rideCount: number
    rideHoursCompleted: number
    ridesRating: RidesRating
}

export class CustomerStats {
    customerCount: number
}

export class VehicleStats {
    avgVehicleCount: number
}

export class WalletStats {
    sellingPackage: SellingPackage
    purchaseRate: PurchaseRate
    revenuePackage: RevenuePackage
    mostRevenuePackageRate: MostRevenuePackageRate
}

export class ReportResp {
    status: boolean
    message: string
    data: RideStats | CustomerStats | VehicleStats | WalletStats
}
