import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

import { supabase } from './supabase';

type FileBody =
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | URLSearchParams
  | string;

export const uploadFile = async (bucketName: string, filePath: string, file: FileBody) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { contentType: 'image/jpg', upsert: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const uploadFileFromUri = async (bucketName: string, fileName: string, uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data = await uploadFile(bucketName, fileName, decode(base64));
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (bucketName: string, filePath: string) => {
  try {
    const { data, error } = await supabase.storage.from(bucketName).remove([filePath]);
    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getPublicUrl = (bucketName: string, filePath: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};