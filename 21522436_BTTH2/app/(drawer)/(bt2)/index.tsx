import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';

import { DarkSwitch } from '~/components/darkMode-switch/darkMode-switch';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';

const SettingsScreen = () => {
  // State management
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Handle feedback submission
  const handleSendFeedback = () => {
    if (feedback.trim() !== '') {
      setFeedbackList([feedback, ...feedbackList]); // Add new feedback to the top
      setFeedback(''); // Reset input field
      if (notificationsEnabled) {
        setDialogVisible(true); // Show dialog if notifications are enabled
      }
    }
  };

  return (
    <View className="flex-1 bg-white p-4 dark:bg-black">
      {/* Logo and App Name */}
      <View className="mb-6 h-32 items-center">
        <Image
          source={require('~/assets/logo.png')}
          // source={require('~/assets/images/react-logo.png')}
          className="aspect-square"
          style={{ width: '100%', height: '100%' }}
        />
        <Text className="text-xl">React Native App</Text>
      </View>

      {/* Switches */}
      <View className="mb-4 flex flex-row justify-between">
        <Text className="text-black dark:text-white">Dark Mode</Text>
        <DarkSwitch />
      </View>

      <View className="mb-4 flex flex-row justify-between">
        <Text className="text-black dark:text-white">Notifications</Text>
        <Switch
          checked={notificationsEnabled}
          nativeID="notifications"
          onCheckedChange={(checked) => setNotificationsEnabled(checked)}
        />
      </View>

      {/* Feedback Input */}

      <Text className="mb-2 text-xl font-semibold text-black dark:text-white">Feedback</Text>
      <Input
        className="native:h-32 mb-2 rounded-md bg-zinc-100 p-2 text-black dark:bg-zinc-900 dark:text-white"
        placeholder="Your feedback here..."
        // placeholderTextColor="text-zinc-200 dark:text-zinc-600"
        value={feedback}
        onChangeText={setFeedback} 
        textAlignVertical="top"
        multiline
      />

      <Button onPress={handleSendFeedback}>
        <Text>Send Feedback</Text>
      </Button>

      {/* FAQs */}
      <Text className="mb-2 mt-6 text-lg font-bold text-black dark:text-white">
        Frequently Asked Questions
      </Text>
      <ScrollView>
        {feedbackList.map((item, index) => (
          <Text key={index} className="mb-2 text-black dark:text-white">
            Q: {item}
          </Text>
        ))}
      </ScrollView>

      {/* Feedback Sent Dialog */}
      <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Sent!</DialogTitle>
            <DialogDescription>Thank you for your feedback!</DialogDescription>
          </DialogHeader>
          <DialogClose>
            <Button onPress={() => setDialogVisible(false)}>
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default SettingsScreen;
