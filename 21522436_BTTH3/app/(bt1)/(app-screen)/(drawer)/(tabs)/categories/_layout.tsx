import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, type ParamListBase, type TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Dimensions } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function CategoriesLayoutScreen() {
  const { colors } = useTheme();
  const width = Dimensions.get('window').width;
  const TAB_COUNT = 3;

  return (
    <MaterialTopTabs
      className="flex-1"
      tabBarPosition="top"
      screenOptions={{
        tabBarStyle: { width, maxWidth: width, minWidth: width },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          minWidth: width / TAB_COUNT,
          backgroundColor: colors.text,
        },
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 14,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarItemStyle: { width: width / TAB_COUNT },
      }}>
      <MaterialTopTabs.Screen name="category1" options={{ title: 'Category 1' }} />
      <MaterialTopTabs.Screen name="category2" options={{ title: 'Category 2' }} />
      <MaterialTopTabs.Screen name="category3" options={{ title: 'Category 3' }} />
      <MaterialTopTabs.Screen name="category4" options={{ title: 'Category 4' }} />
    </MaterialTopTabs>
  );
}
