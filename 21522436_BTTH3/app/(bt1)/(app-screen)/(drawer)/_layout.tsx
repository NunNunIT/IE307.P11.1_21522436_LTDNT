import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        name="(tabs)"
        options={{
          headerTitle: '',
          drawerLabel: 'Home BT1',
          drawerIcon: ({ size, color }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          headerTitle: 'Help Screen',
          drawerLabel: 'Help',
          drawerIcon: ({ size, color }) => (
            <Icon name="question-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="noti"
        options={{
          headerTitle: 'Notification Screen',
          drawerLabel: 'Notification',
          drawerIcon: ({ size, color }) => <Icon name="bell" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="setting"
        options={{
          headerTitle: 'Setting',
          drawerLabel: 'Setting',
          drawerIcon: ({ size, color }) => <Icon name="cog" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: '',
          drawerLabel: 'Out',
          drawerIcon: ({ size, color }) => <Icon name="cog" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
