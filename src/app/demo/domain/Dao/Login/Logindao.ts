import { Modulesdao } from "../Modules/Modulesdao";

export interface Logindao {
    token: string;
    refreshToken: string;
    expiration: Date;
    userName:string;
    accessModules: Modulesdao;
    roleName:string;
    zoneCount:string;
}

export interface LoginResponsedao{
    status: boolean;
    message: string;
    data: Logindao;
}