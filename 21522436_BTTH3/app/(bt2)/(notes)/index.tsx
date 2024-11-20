import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, View, FlatList, ActivityIndicator } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { getAllNotes, deleteNote } from '~/lib/database/notes';
import { Plus, Trash } from '~/lib/icons/IconList';

export interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getAllNotes();
      setNotes(data || []);
      setLoading(false); // Dừng hiển thị loading khi dữ liệu đã tải xong
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id)); // Update danh sách sau khi xóa
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View
      key={item.id}
      className="relative my-3 flex w-full flex-row items-center justify-between rounded border-2 border-zinc-200 p-3 dark:border-zinc-800">
      <Pressable
        onTouchEnd={() =>
          router.push({
            pathname: '/(bt2)/(notes)/editNote',
            params: { id: item.id.toString() },
          })
        }
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#E5E7EB' : 'transparent', // Light mode color
          },
          {
            backgroundColor: pressed ? '#1F2937' : 'transparent', // Dark mode color (adjust as needed)
          },
        ]}
        className="w-3/4">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="line-clamp-6 font-medium text-zinc-500 dark:text-zinc-500">
          {item.content}
        </Text>
      </Pressable>
      <Button
        onPress={() => handleDelete(item.id)}
        variant="destructive"
        size="icon"
        className="rounded-full">
        <Trash className="size-6 text-white" />
      </Button>
    </View>
  );

  return (
    <View className="flex h-full w-full items-center justify-start p-4">
      <Text className="font-bold text-teal-500">Note App</Text>
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-xl font-bold text-zinc-800 dark:text-zinc-200">All Notes</Text>
        <Button
          onPress={() => router.push('/(bt2)/(notes)/addNote')}
          className="rounded-full bg-teal-500"
          size="icon">
          <Plus className="size-6 text-white" />
        </Button>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0D9488" />
        </View>
      ) : (
        <FlatList
          className="mt-3 w-full"
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNote}
          ListEmptyComponent={
            <Text className="text-center text-xl text-zinc-600">You have 0 notes</Text>
          }
        />
      )}
    </View>
  );
}
