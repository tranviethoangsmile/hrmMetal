interface create_daily_report {
    product : string,
    user_id : string,
    date: string,
    shift: string,
    quantity : number,
    operated_time: number,
    shutdown_time: number,
    active_time: number,
    operator_history : string,
 }

 interface search_report {
    product?: string, 
    user_id ?: string,
    date?: string,
    shift?: string,
 }

 export { create_daily_report, search_report }