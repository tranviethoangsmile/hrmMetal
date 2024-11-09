export interface create_conversation_interface {
    title?: string;
    sender_id: string;
    receiver_id: string;
}

export interface create_conversation_group_interface {
    title: string;
    sender_id: string;
    receivers: [];
}
