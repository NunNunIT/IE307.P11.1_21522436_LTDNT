// 21522436 - Nguyễn Thị Hồng Nhung
import React from 'react';
import { ScrollView } from 'react-native';

import { Text } from '~/components/ui/text';

interface FAQSectionProps {
  feedbackList: string[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ feedbackList }) => (
  <ScrollView>
    {feedbackList.map((item, index) => (
      <Text key={index} className="mb-2 text-black dark:text-white">
        Q: {item}
      </Text>
    ))}
  </ScrollView>
);
