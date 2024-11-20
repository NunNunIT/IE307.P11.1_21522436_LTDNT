import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, View, ScrollView } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { addNote } from '~/lib/database/notes'; 
import { Check, XIcon } from '~/lib/icons/IconList';
import { useFontSize } from '~/provider/FontSizeProvider';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export default function AddNoteScreen() {
  const router = useRouter();
  const { fontSize } = useFontSize();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // Hiển thị lỗi thông qua Alert khi có lỗi
  useEffect(() => {
    if (errors.title) {
      Alert.alert('Validation Error', errors.title.message || 'Invalid title');
    } else if (errors.content) {
      Alert.alert('Validation Error', errors.content.message || 'Invalid content');
    }
  }, [errors]);

  const onSubmit = async (data: NoteFormValues) => {
    try {
      await addNote(data.title, data.content); // Thêm ghi chú vào cơ sở dữ liệu
      router.push('/(bt2)/(notes)'); // Điều hướng về màn hình danh sách ghi chú sau khi thêm
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      Alert.alert('Add Note Failed', errorMessage, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <ScrollView className="p-4">
      <View className="mb-4 flex flex-row items-center justify-between gap-3">
        <Text className="text-2xl font-bold text-teal-500">Add Note</Text>
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
