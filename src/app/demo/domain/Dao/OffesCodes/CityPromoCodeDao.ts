import { CityDao } from "../Cities/CityDao"

export class CityPromoCodeListResponse {
    status: string
    message: string
    promoCities: ListCityPromoCode
}

export class ListCityPromoCode {
    data: CityPromoCodeDao[]
}

export class CityPromoCodeDao {
    id: string
    city:CityDao;
}

