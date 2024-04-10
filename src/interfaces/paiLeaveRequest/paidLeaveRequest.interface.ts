interface create {
    reason: string;
    user_id: string;
    leader_id: string;
    date_request: string;
    date_leave: string;
}

interface update {
    user_id?: string;
    feedback?: string;
    id: string;
}

export { create, update };
