// Các import giữ nguyên
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { editNote, getNote } from '~/lib/database/notes'; // Update and fetch functions
import { Check, XIcon } from '~/lib/icons/IconList';
import { useFontSize } from '~/provider/FontSizeProvider';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export default function EditNoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get note ID from route parameters
  const [loading, setLoading] = useState(true);
  const [originalNote, setOriginalNote] = useState<NoteFormValues | null>(null);
  const { fontSize } = useFontSize();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // Hiển thị lỗi bằng Alert khi có lỗi xác thực
  useEffect(() => {
    if (errors?.title) {
      Alert.alert('Validation Error', errors.title.message || 'Invalid title');
    } else if (errors?.content) {
      Alert.alert('Validation Error', errors.content.message || 'Invalid content');
    }
  }, [errors]);

  // Fetch the note data on load
  useEffect(() => {
    const loadNote = async () => {
      if (!id) return;
      try {
        const note = await getNote(Number(id)); // Fetch note by ID
        if (note) {
          setValue('title', note.title);
          setValue('content', note.content);
          setOriginalNote({ title: note.title, content: note.content }); // Store original note data
        }
      } catch (error) {
        console.error('Error loading note:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNote();
  }, [id, setValue]);

  const onSubmit = async (data: NoteFormValues) => {
    if (!id) return;

    // Check if the current data matches the original note data
    if (
      originalNote &&
      data.title === originalNote.title &&
      data.content === originalNote.content
    ) {
      Alert.alert("Note hasn't changed");
      return;
    }

    try {
      await editNote(Number(id), data.title, data.content);
      router.push('/(bt2)/(notes)'); // Navigate back to the notes list
    } catch (error) {
      console.error('Error editing note:', error);
      Alert.alert('Error', 'An error occurred while saving the note.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView className="p-4">
      <View className="mb-4 flex flex-row items-center justify-between gap-3">
        <Text className="text-2xl font-bold text-teal-500">Edit Note</Text>
        <View className="flex flex-row gap-3">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onPress={() => router.back()}>
            <XIcon className="size-6 text-zinc-500" />
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-teal-500"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            <Check className="size-6 text-white" />
          </Button>
        </View>
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="native:h-24"
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter your title"
              value={value}
              textAlignVertical="top"
              multiline
              style={{
                fontSize, // Áp dụng fontSize cho văn bản
              }}
            />
          )}
        />
      </View>
      <View className="mb-4">
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="native:h-52"
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter your note"
              value={value}
              textAlignVertical="top"
              multiline
              style={{
                fontSize, // Áp dụng fontSize cho văn bản
              }}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}
