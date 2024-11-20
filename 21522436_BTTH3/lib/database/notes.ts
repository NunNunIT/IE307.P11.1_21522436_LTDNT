import { supabase } from '~/utils/supabase';

export interface Note {
  id: number;
  title: string;
  content: string;
}

// Thêm ghi chú mới
export const addNote = async (title: string, content: string): Promise<Note | void> => {
  const { data, error } = await supabase.from('notes').insert([{ title, content }]).single(); 
  // Use single to get a single inserted record
  if (error) {
    console.error('Error adding note:', error);
    return;
  }

  if (data) {
    console.log('Note added:', data);
    return data as Note; // Type assertion if we know it returns a Note
  }
};

// Lấy tất cả ghi chú
export const getAllNotes = async (): Promise<Note[] | void> => {
  const { data, error } = await supabase.from('notes').select('*');
  if (error) {
    console.error('Error retrieving notes:', error);
  } else {
    return data || [];
  }
};

// Lấy ghi chú theo ID
export const getNote = async (id: number): Promise<Note | void> => {
  const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
  if (error) {
    console.error('Error retrieving note:', error);
  } else {
    return data;
  }
};

// Cập nhật ghi chú
export const editNote = async (
  id: number,
  title: string,
  content: string
): Promise<Note | void> => {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', id)
    .single(); // Use single to get a single updated record

  if (error) {
    console.error('Error editing note:', error);
    return;
  }

  if (data) {
    console.log('Note edited:', data);
    return data as Note; // Type assertion to ensure TypeScript treats data as a Note
  }
};

// Xóa ghi chú theo ID
export const deleteNote = async (id: number): Promise<void> => {
  const { data, error } = await supabase.from('notes').delete().eq('id', id);
  if (error) {
    console.error('Error deleting note:', error);
  } else {
    console.log('Note deleted:', data);
  }
};
