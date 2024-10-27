import { Link } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { Input } from '~/components/ui/input';
import { Mail, Lock, User } from '~/lib/icons/IconList';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Perform registration action
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-32 items-center justify-center bg-zinc-900">
        <Text className="mb-2 text-3xl font-bold text-white">
          Bắt đầu với <Text className="text-teal-500">Ứng dụng</Text>
        </Text>
        <Text className="text-base font-medium text-zinc-300">Khởi đầu mới với ứng dụng!</Text>
      </View>

      <View className="flex-grow bg-white px-6 py-3 dark:bg-black">
        <View className="relative mb-5">
          <Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-300">
            Full Name
            <Text className="text-red-500 dark:text-red-500">*</Text>
          </Text>
          <Input
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            onChangeText={(name) => setForm({ ...form, name })}
            placeholder="John Doe"
            value={form.name}
            startIcon={<User className="ml-1 size-6 text-zinc-500" />}
          />
          {errors.name && (
            <Text className="absolute -bottom-6 text-sm text-red-500 dark:text-red-500">{errors.name}</Text>
          )}
        </View>

        <View className="relative mb-5">
          <Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-300">
            Email Address
            <Text className="text-red-500 dark:text-red-500">*</Text>
          </Text>
          <Input
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder="john@example.com"
            value={form.email}
            startIcon={<Mail className="ml-1 size-6 text-zinc-500" />}
          />
          {errors.email && (
            <Text className="absolute -bottom-6 text-sm text-red-500 dark:text-red-500">{errors.email}</Text>
          )}
        </View>

        <View className="relative mb-5">
          <Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-300">
            Password
            <Text className="text-red-500 dark:text-red-500">*</Text>
          </Text>
          <Input
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            secureTextEntry
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder="Nhập mật khẩu"
            value={form.password}
            startIcon={<Lock className="ml-1 size-6 text-zinc-500" />}
          />
          {errors.password && (
            <Text className="absolute -bottom-6 text-sm text-red-500 dark:text-red-500">{errors.password}</Text>
          )}
        </View>

        <View className="relative mb-5">
          <Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-300">
            Confirm Password
            <Text className="text-red-500 dark:text-red-500">*</Text>
          </Text>
          <Input
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            secureTextEntry
            onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            startIcon={<Lock className="ml-1 size-6 text-zinc-500" />}
          />
          {errors.confirmPassword && (
            <Text className="absolute -bottom-6 text-sm text-red-500 dark:text-red-500">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={handleSubmit} className="mt-5">
          <View className="flex-row items-center justify-center rounded-full border border-teal-500 bg-teal-500 px-5 py-3">
            <Text className="text-lg font-semibold text-zinc-900">Get Started</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mt-auto">
          <Text className="text-center text-base font-semibold text-zinc-400 dark:text-zinc-600">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-500 underline">
              Sign in
            </Link>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}