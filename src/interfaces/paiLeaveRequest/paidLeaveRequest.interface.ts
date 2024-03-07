interface create {
    reason: string;
    user_id: string;
    leader_id: string;
    date_to: string;
    date_from: string;
}

interface update {
    user_id?: string;
    id: string;
}

export { create, update };
