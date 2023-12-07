export type CodeUseDao = {
    id: string,
    customer: string,
    country: string
    created_at: Date
}

export type CodeUsesResponse = {
    data: { uses: { list: CodeUseDao[], total: number } },
    status: boolean
}
