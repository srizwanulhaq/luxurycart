import { UsersDao } from "./UsersDao";

export class UserListDao {
    results: UsersDao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

export class UserListResponse {
    status: boolean;
    message: string;
    data: UserListDao;
}