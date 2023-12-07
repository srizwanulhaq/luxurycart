import { CityDao } from "../Cities/CityDao"

export class CityDiscountCodeListResponse {
    status: string
    message: string
    discountCities: ListCityDiscountCode
}

export class ListCityDiscountCode {
    data: CityDiscountCodeDao[]
}

export class CityDiscountCodeDao {
    id: string
    city:CityDao;
}


