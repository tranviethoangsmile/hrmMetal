interface create {
    date: string;
    reason: string;
    staff_id: string;
    leader_id: string;
}

interface update {
    user_id?: string;
    id: string;
}

export { create, update };
