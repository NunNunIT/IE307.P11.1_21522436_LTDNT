import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerLayout = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Drawer>
      <Drawer.Screen
        name="(bt1)/index"
        options={{
          headerTitle: 'BT1',
          drawerLabel: 'BT1',
          drawerIcon: ({ size, color }) => <Icon name="facebook" size={size} color={color} />,
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
      <Drawer.Screen
        name="(bt2)/index"
        options={{
          headerTitle: 'BT2',
          drawerLabel: 'BT2',
          drawerIcon: ({ size, color }) => <Icon name="carrot" size={size} color={color} />,
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
