// 21522436 - Nguyễn Thị Hồng Nhung
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '~/components/ui/dialog';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';

interface NotificationSettingsProps {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  dialogVisible,
  setDialogVisible,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setNotificationsEnabled(checked);
    if (!checked) {
      setDialogVisible(false); // Hide dialog if notifications are turned off
    }
  };

  return (
    <View>
      {/* Notifications Switch */}
      <Switch
        checked={notificationsEnabled}
        nativeID="notifications"
        onCheckedChange={handleSwitchChange}
      />

      {/* Dialog for Feedback Submission */}
      {notificationsEnabled && (
        <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
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
      )}
    </View>
  );
};
