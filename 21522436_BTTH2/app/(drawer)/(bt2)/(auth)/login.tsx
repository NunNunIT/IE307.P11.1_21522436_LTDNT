import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { Input } from '~/components/ui/input';
import { Mail, Lock } from '~/lib/icons/IconList';

// Định nghĩa các giao diện
interface Form {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [form, setForm] = useState<Form>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const { colorScheme } = useColorScheme();

  // Hàm validate với kiểu dữ liệu rõ ràng
  const validate = () => {
    const newErrors: Errors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm submit
  const handleSubmit = () => {
    if (validate()) {
      // Xử lý logic khi form hợp lệ (ví dụ: gọi API)
      console.log('Form is valid, proceed with submit');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-32 items-center justify-center bg-zinc-900 dark:bg-zinc-900">
        <Text className="mb-2 text-3xl font-bold text-white dark:text-white">
          Đăng nhập vào <Text className="text-teal-500">Ứng dụng</Text>
        </Text>
        <Text className="text-base font-medium text-zinc-300 dark:text-zinc-300">
          Chào mừng quay trở lại!
        </Text>
      </View>

      <View className="flex-shrink flex-grow basis-0 bg-white px-6 py-3 dark:bg-black">
        <View className="relative mb-5">
          <Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-300">
            Email address
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

        <TouchableOpacity onPress={handleSubmit} className="mt-5">
          <View className="flex-row items-center justify-center rounded-full border border-teal-500 bg-teal-500 px-5 py-3">
            <Text className="text-lg font-semibold text-zinc-900">Sign in</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mt-auto">
          <Text className="text-center text-base font-semibold text-zinc-400 dark:text-zinc-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-teal-500 underline">
              Sign up
            </Link>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
