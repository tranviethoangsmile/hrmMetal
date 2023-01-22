interface create_daily_report {
    product : string,
    user_id : string,
    date: string,
    quantity : number,
    operated_time: number,
    shutdown_time: number,
    active_time: number,
    operator_history : string,
 }

 export { create_daily_report }