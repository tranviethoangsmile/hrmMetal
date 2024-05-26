interface create_checkin_interface {
    user_id: string;
    time_in: string;
    date: string;
    work_shift: string;
    isWeekend?: boolean;
}
interface update_checkin_interface {
    user_id: string;
    date: string;
    work_shift: string;
    time_out: string;
    is_checked: boolean;
    work_time?: number;
}
interface is_Checked_interface {
    user_id: string;
    date: string;
}
interface get_checkin_in_date_of_position_interface {
    date: string;
    position: string;
}

interface check_value_request_checkin {
    user_id: string;
    date: string;
    check_time: string;
    work_shift: string;
}

export {
    create_checkin_interface,
    update_checkin_interface,
    is_Checked_interface,
    get_checkin_in_date_of_position_interface,
    check_value_request_checkin,
};
