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
    user_id: string;
    feedback?: string;
    admin_id: string;
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

interface IUpdateApprovePaidLeave {
    leader_id: string;
    feedback?: string;
    id: string;
    is_approve: boolean;
}



export { ICreatePaidLeave, IUpdatePaidLeave, ISearchPaidLeave, IUpdateApprovePaidLeave };
