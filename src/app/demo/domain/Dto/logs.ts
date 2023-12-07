
export interface LogsDao {
    result: boolean
    status: string
    message: string
    data: LogsData
  }
  
  export interface LogsData {
    results: logsDetail[]
    currentPage: number
    pageCount: number
    pageSize: number
    rowCount: number
    isLast: boolean
    firstRowOnPage: number
    lastRowOnPage: number
  }
  
  export interface logsDetail {
    userId: string
    headers: string
    method: string
    query_String: string
    request_Path: string
    request_Body: string
    response_Body: string
    response_Status_Code: string
    platform: string
  }
  
  

  