import { supabase } from '../lib/supabase';

export async function uploadDocument(bucket: string, file: File) {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(`documents/${fileName}`, file);

  if (uploadError) throw uploadError;

  return data.path;
}