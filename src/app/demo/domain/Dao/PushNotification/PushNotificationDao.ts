export class CountryDao {
    id: string
    name: string
    cities: CityDao[]
}

export class CityDao {
    id: string
    name: string
    zones: ZoneDao[]
}

export class ZoneDao {
    id: string
    title: string
    isDisable?: boolean
}

export class LoadCountriesResp {
    status: boolean
    message: string
    data: { countries: CountryDao[] }
}

export class CustomerDao {
    code: string
    name: string
}

export class getCustomersResp {
    status: boolean
    message: string
    userphonedto: CustomerDao[]
}
