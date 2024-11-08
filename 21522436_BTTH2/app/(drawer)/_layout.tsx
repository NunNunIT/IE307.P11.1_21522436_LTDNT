import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import DarkModeText from '~/components/darkModeOption/text';

const DrawerLayout = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerIcon: ({ size, color }) => <Icon name="home-outline" size={size} color={color} />,
        // headerBackgroundContainerStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: colorScheme === 'light' ? '#14b8a6' : '#0d9488' },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          // headerTitle: 'Home',
          // drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => <Icon name="home" size={size} color={color} />,
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(bt1)/index"
        options={{
          headerTitle: '',
          drawerLabel: 'BT1',
          drawerIcon: ({ size, color }) => <Icon name="facebook" size={size} color={color} />,
          headerRight: () => <DarkModeText />,
        }}
      />
      <Drawer.Screen
        name="(bt2)/index"
        options={{
          headerTitle: 'BT2',
          drawerLabel: 'BT2',
          drawerIcon: ({ size, color }) => <Icon name="cog" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="(bt3)"
        options={{
          headerTitle: '',
          drawerLabel: 'BT3',
          drawerIcon: ({ size, color }) => <Icon name="leaf" size={size} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={toggleColorScheme}
              className="mr-2 h-6 flex-1 items-center justify-center bg-transparent">
              <Text selectable={false} className="dark:text-white">
                {`${colorScheme === 'dark' ? 'Dark Mode!🌙' : 'Light Mode!🌞'}`}
              </Text>
            </Pressable>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
