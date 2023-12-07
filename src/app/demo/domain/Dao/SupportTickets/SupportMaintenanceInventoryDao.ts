export class SupportMaintenanceInventoryListResponse {
    status: string
    message: string
    data: SMInventoryDao[]
}

export class SMInventoryDao {
    id: string
    name: string
    quantity: number
}

export class SMInventoryFieldDao {
    inventoryId: string
    inventoryName: string
    quantity: number
}

export class SMInventoryItemDao {
    id: string
    name: string
}
