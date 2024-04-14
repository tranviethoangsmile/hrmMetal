interface create {
    reason: string;
    user_id: string;
    leader_id: string;
    date_request: string;
    date_leave: string;
    position: string;
}

interface update {
    user_id?: string;
    feedback?: string;
    is_confirm?: boolean;
    admin_id?: string;
    id: string;
}
interface search {
    user_id?: string;
    leader_id?: string;
    date_request?: string;
    date_leave?: string;
    position?: string;
    is_approve?: boolean;
    is_confirm?: boolean;
}

export { create, update, search };
