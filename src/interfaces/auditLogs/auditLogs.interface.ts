interface IAuditLogsCreate {
    actor_id: any;
    actor_name: string;
    action: string;
    resource_type: string;
    resource_id: string;
    old_value: Record<string, any> | null;
    new_value: Record<string, any> | null;
    ip_address?: string | null;
}

export { IAuditLogsCreate }