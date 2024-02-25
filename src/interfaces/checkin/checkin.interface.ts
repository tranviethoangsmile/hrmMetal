interface create_checkin_interface {
    user_id: string;
    time_in: string;
    date: string;
    work_shift: string;
}
interface update_checkin_interface {
    user_id: string;
    date: string;
    work_shift: string;
    time_out: string;
}
interface is_Checked_interface {
    user_id: string;
    date: string;
}

export {
    create_checkin_interface,
    update_checkin_interface,
    is_Checked_interface,
};
