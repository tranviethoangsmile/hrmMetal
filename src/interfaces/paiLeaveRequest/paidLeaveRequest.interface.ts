interface ICreatePaidLeave {
    reason: string;
    user_id: string;
    leader_id: string;
    date_request: string;
    date_leave: string;
    position: string;
    is_half?: boolean;
}

interface IUpdatePaidLeave {
    user_id?: string;
    feedback?: string;
    is_confirm?: boolean;
    admin_id?: string;
    id: string;
}
interface ISearchPaidLeave {
    user_id?: string;
    leader_id?: string;
    date_request?: string;
    date_leave?: string;
    position?: string;
    is_approve?: boolean;
    is_confirm?: boolean;
}

export { ICreatePaidLeave, IUpdatePaidLeave, ISearchPaidLeave };
