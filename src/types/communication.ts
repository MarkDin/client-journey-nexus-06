export interface WeeklyThread {
    id: string;
    clientId: string;
    clientName: string;
    weekRange: string;
    summary: string;
    tags: string[];
    aiGenerated: boolean;
    edited: boolean;
}

export interface ClientCommunication {
    id: string;
    week: string;
    summary: string;
    tags: string[];
    threadCount: number;
}

export interface ClientSummary {
    clientId: string;
    clientName: string;
    summary: string;
    keyInsights: string[];
    edited: boolean;
    communications: ClientCommunication[];
}

export interface Email {
    id: string;
    from: string;
    email: string;
    to: string;
    date: string;
    subject: string;
    content: string;
    thread_id: string;
    parent_id: string | null;
    direction: 'inbound' | 'outbound';
    sender_email: string;
    receiver_email: string;
    status: 'sent' | 'draft' | 'archived' | 'deleted';
    is_read: boolean;
    read_at: string | null;
    created_at: string;
    updated_at: string;
} 