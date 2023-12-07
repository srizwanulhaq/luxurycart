import { CityDao } from "../Cities/CityDao"

export class CityPackageDiscountListResponse {
    status: string
    message: string
    packageCities: ListCityPackageDiscount
}

export class ListCityPackageDiscount {
    data: CityPackageDiscountDao[]
}

export class CityPackageDiscountDao {
    id: string
    city:CityDao;
}


