import { supabase } from '@/integrations/supabase/client';
import { Email, EmailThread, Tag } from '@/types/email';

export const getCustomerEmailThreads = async (customerId: string) => {
    const { data, error } = await supabase
        .rpc('get_customer_email_threads', { p_customer_id: customerId });

    if (error) throw error;
    return data as EmailThread[];
};

export const getEmailThread = async (threadId: string) => {
    const { data, error } = await supabase
        .rpc('get_email_thread', { p_thread_id: threadId });

    if (error) throw error;
    return data as Email[];
};

export const addTag = async (objectId: string, objectType: string, value: string, color?: string) => {
    const { data, error } = await supabase
        .rpc('add_tag', {
            p_object_id: objectId,
            p_object_type: objectType,
            p_value: value,
            p_color: color
        });

    if (error) throw error;
    return data;
};

export const removeTag = async (objectId: string, objectType: string, value: string) => {
    const { data, error } = await supabase
        .rpc('remove_tag', {
            p_object_id: objectId,
            p_object_type: objectType,
            p_value: value
        });

    if (error) throw error;
    return data;
};

export const getObjectTags = async (objectId: string, objectType: string) => {
    const { data, error } = await supabase
        .rpc('get_object_tags', {
            p_object_id: objectId,
            p_object_type: objectType
        });

    if (error) throw error;
    return data as Tag[];
}; 