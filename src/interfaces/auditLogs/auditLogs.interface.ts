interface IAuditLogsCreate {
    actor_id: string;
    actor_name: string;
    action: string;
    resource_type: string;
    resource_id: string;
    old_value: Record<string, any> | null;
    new_value: Record<string, any> | null;
    ip_address?: string | null;
}

interface IAuditLogSearchInput {
    resource_type?: string;
    actor_id?: string;
    from?: string;    // YYYY-MM-DD
    to?: string;      // YYYY-MM-DD
    page?: number;
    limit?: number;
}


export { IAuditLogsCreate, IAuditLogSearchInput }