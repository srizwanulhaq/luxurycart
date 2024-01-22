export class WalletPackageListResponse {
    status: string
    message: string
    packagesto: ListWalletPackages
}

export class ListWalletPackages {
    data: WalletPackageDao[]
    totalCount: number
}

export class WalletPackageDao {
    id: string
    title: string
    top_Up_Amount: number
    bonus_Amount: number
    is_Default: boolean
    active: boolean
    created_at: Date
    updated_at: Date
    lstValidZoneId:string[];
    //lstValidZones:ZonePackageDao[];
}
