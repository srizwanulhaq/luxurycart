import { CityDao } from "../Cities/CityDao"

export class CityCouponCodeListResponse {
    status: string
    message: string
    couponCities: ListCityCouponCode
}

export class ListCityCouponCode {
    data: CityCouponCodeDao[]
}

export class CityCouponCodeDao {
    id: string
    city:CityDao;
}


