
export class MaintenanceDao{
    id: string;
    vehicle_Id: string;
    vehicle: MaintenanceVehiclesDao;
    role_Id: string;
    role: MaintenanceRoleDao;
    support_Ticket_Id: string;
    support_Ticket: MaintenanceSupportTicketDao;
    fixed_Date: string;
    description: string;
    fixed_Time: string;
    active: boolean;
    created_at: Date;
}

export class MaintenanceResponse{
    results: MaintenanceDao[];
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    isLast: boolean;
    firstRowOnPage: number;
    lastRowOnPage: number;
}

export class MaintenanceRoot{
    result: boolean;
    status: string;
    message: string;
    data: MaintenanceResponse;
}

export class MaintenanceVehiclesDao{
    number: string;
}

export class MaintenanceRoleDao{
    name: string;
}

export class MaintenanceSupportTicketDao{
    id: string;
    ticket_Number: number;
}
export class InventoryDetailsDao{
    id: string;
    name: string;
}

export class MaintenanceInventoryDao{
id: string;
maintenance_Id: string;
inventory_Id: string;
inventory: string;
quantity: number;
price: number;
active: boolean;
}

export class MaintenanceInventoryDetailsRoot{
result: boolean;
status: string;
message: string;
data: MaintenanceInventoryDao[];
}