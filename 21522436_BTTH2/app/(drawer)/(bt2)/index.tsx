// 21522436 - Nguyễn Thị Hồng Nhung

import React, { useState } from 'react';
import { View } from 'react-native';

import { FAQSection } from '~/components/FAQSection';
import DarkSwitch from '~/components/darkModeOption/switch';
import { FeedbackSection } from '~/components/feedbackSection';
import { LogoHeader } from '~/components/logoHeader';
import { NotificationSettings } from '~/components/notificationSetting';
import { Text } from '~/components/ui/text';

const SettingsAndFeedbackScreen = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackList, setFeedbackList] = useState<string[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Handle feedback submission
  const handleSendFeedback = () => {
    if (feedback.trim() !== '') {
      setFeedbackList([feedback, ...feedbackList]);
      setFeedback('');
      setDialogVisible(true); // Show dialog when feedback is sent
    }
  };

  return (
    <View className="flex-1 bg-white p-4 dark:bg-black">
      {/* Logo and App Name */}
      <LogoHeader sizeImage="size-32" />

      {/* Switches */}
      <View className="mb-4 flex flex-row justify-between">
        <Text className="text-black dark:text-white">Dark Mode</Text>
        <DarkSwitch />
      </View>

      <View className="mb-4 flex flex-row justify-between">
        <Text className="text-black dark:text-white">Notifications</Text>
        <NotificationSettings dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />
      </View>

      {/* Feedback Input */}
      <Text className="mb-2 text-xl font-semibold text-black dark:text-white">Feedback</Text>
      <FeedbackSection
        feedback={feedback}
        setFeedback={setFeedback}
        handleSendFeedback={handleSendFeedback}
      />

      {/* FAQs */}
      <Text className="mb-2 mt-6 text-lg font-bold text-black dark:text-white">
        Frequently Asked Questions
      </Text>
      <FAQSection feedbackList={feedbackList} />
    </View>
  );
};

export default SettingsAndFeedbackScreen;
