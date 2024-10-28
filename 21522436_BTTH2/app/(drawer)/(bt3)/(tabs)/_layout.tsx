import { Redirect, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '~/components/provider/auth-provider';

// eslint-disable-next-line import/order
import { Home, Component, Heart, User } from '~/lib/icons/IconList';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? 'text-sky-500' : 'text-zinc-500'} dark:${focused ? 'text-sky-500' : 'text-zinc-300'}`}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Home
              fill={focused ? '#0ea5e9' : '#fff'}
              className={`size-20  ${focused ? 'text-sky-500 dark:text-sky-500' : 'text-zinc-500 dark:text-zinc-300'}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? 'text-sky-500' : 'text-zinc-500'} dark:${focused ? 'text-sky-500' : 'text-zinc-300'}`}>
              Categories
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Component
              fill={focused ? '#0ea5e9' : '#fff'}
              className={`size-20  ${focused ? 'text-sky-500 dark:text-sky-500' : 'text-zinc-500 dark:text-zinc-300'}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? 'text-sky-500' : 'text-zinc-500'} dark:${focused ? 'text-sky-500' : 'text-zinc-300'}`}>
              Favourites
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            <Heart
              className={`size-20  ${focused ? 'text-sky-500 dark:text-sky-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              fill={focused ? '#0ea5e9' : '#fff'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${focused ? 'text-sky-500' : 'text-zinc-500'} dark:${focused ? 'text-sky-500' : 'text-zinc-300'}`}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            <User
              fill={focused ? '#0ea5e9' : '#fff'}
              className={`size-20  ${focused ? 'text-sky-500 dark:text-sky-500' : 'text-zinc-500 dark:text-zinc-300'}`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
