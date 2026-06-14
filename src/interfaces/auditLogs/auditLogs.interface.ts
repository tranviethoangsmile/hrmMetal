interface IAuditLogsCreate {
    actor_id: any;
    actor_name: string;
    action: string;
    resource_type: string;
    resource_id: any;
    old_value: {
        id: any;
        is_confirm: boolean;
    };
    new_value: {
        id: any;
        is_confirm: boolean;
    };
}

export { IAuditLogsCreate }