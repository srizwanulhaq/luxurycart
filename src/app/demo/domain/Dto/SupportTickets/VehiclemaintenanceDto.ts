import { NewMaintenanceInventoriesDto } from "./MaintenanceInventoriesDto"

export class NewVehiclemaintenanceDto {
    SupportTicketId: string
    vehicleNumber: string
    fixedDate: Date
    fixedTime: Date
    description: string
    maintenanceInventories?: NewMaintenanceInventoriesDto[]
}
