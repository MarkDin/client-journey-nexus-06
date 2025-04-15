export interface Tag {
    id: number;
    value: string;
    color: string;
    created_at: string;
}

export interface EmailAttachment {
    name: string;
    size: number;
    type: string;
    path: string;
}

export interface EmailThread {
    thread_id: string;
    subject: string;
    last_message_at: string;
    message_count: number;
    unread_count: number;
    snippet: string;
    tags: Tag[];
}

export interface Email {
    id: number;
    parent_id: number | null;
    sender: string;
    sender_email: string;
    receiver: string;
    receiver_email: string;
    subject: string;
    content: string;
    attachments: EmailAttachment[];
    tags: Tag[];
    send_at: string;
    direction: 'inbound' | 'outbound';
    is_read: boolean;
    level: number;
} 