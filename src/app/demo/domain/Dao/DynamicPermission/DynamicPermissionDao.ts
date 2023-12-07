export class DynamicPermissionDto
{
    id: string;
    title: string;
    number: number;
}

export class DynamicTypeDto
{
    id: string
    title: string
    number: number;
    lstDynamicTypeData: DynamicDatatypeDto[];
}

export class DynamicPermissionRepsonseDto
{
    lstDynamicTypeDto: DynamicTypeDto[];
}

export class DynamicDatatypeDto
{
    id: string;
    title: string;
    number:number;
    lstDynamicData: DynamicDataDto[];
}

export class DynamicDataDto
{
    id: string;
    title: string;
    isSelected: boolean;
}