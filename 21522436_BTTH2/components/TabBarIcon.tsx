import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

import { Menu } from '~/lib/icons/IconList';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  // return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
  return <Menu size={28} className="text-black dark:text-white" />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
