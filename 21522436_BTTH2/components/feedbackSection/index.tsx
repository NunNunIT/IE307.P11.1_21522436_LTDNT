// 21522436 - Nguyễn Thị Hồng Nhung
import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

interface FeedbackSectionProps {
  feedback: string;
  setFeedback: (text: string) => void;
  handleSendFeedback: () => void;
}
export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedback,
  setFeedback,
  handleSendFeedback,
}) => (
  <View>
    <Input
      className="native:h-32 mb-2 rounded-md bg-zinc-100 p-2 text-black dark:bg-zinc-900 dark:text-white"
      placeholder="Your feedback here..."
      value={feedback}
      onChangeText={setFeedback}
      textAlignVertical="top"
      multiline
    />
    <Button onPress={handleSendFeedback}>
      <Text>Send Feedback</Text>
    </Button>
  </View>
);
