// 21522436 - Nguyễn Thị Hồng Nhung
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { z } from 'zod';

import { FormItem } from '~/components/formItem';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Mail, Lock, User, EyeClosed, Eye } from '~/lib/icons/IconList';
import { supabase } from '~/utils/supabase';

// Define schema using Zod
const schema = z
  .object({
    name: z.string().nonempty('Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Alert.alert('Sign up Failed', error.message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      // Success logic here
    }
  };

  return (
    <View className="flex-grow">
      <Spinner visible={isSubmitting} />
      <View className="flex-grow bg-white px-6 py-3 dark:bg-black">
        {/* Full Name Input */}
        <FormItem name="name" label="Name" error={errors?.name?.message} required>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                placeholder="John Doe"
                value={value}
                startIcon={<User className="ml-1 size-6 text-zinc-500" />}
              />
            )}
          />
        </FormItem>

        {/* Email Input */}
        <FormItem name="email" label="Email" error={errors?.email?.message} required>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="john@example.com"
                value={value}
                startIcon={<Mail className="ml-1 size-6 text-zinc-500" />}
              />
            )}
          />
        </FormItem>

        {/* Password Input */}
        <FormItem name="password" label="Password" error={errors?.password?.message} required>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Nhập mật khẩu"
                value={value}
                startIcon={<Lock className="ml-1 size-6 text-zinc-500" />}
                endIcon={
                  <Button variant="none" onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeClosed className="ml-1 size-6 text-zinc-500" />
                    ) : (
                      <Eye className="ml-1 size-6 text-zinc-500" />
                    )}
                  </Button>
                }
              />
            )}
          />
        </FormItem>

        {/* 21522436 - Nguyễn Thị Hồng Nhung */}
        {/* Confirm Password Input */}
        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          error={errors?.confirmPassword?.message}
          required>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={!showConfirmPassword}
                onChangeText={onChange}
                placeholder="Nhập lại mật khẩu"
                value={value}
                startIcon={<Lock className="ml-1 size-6 text-zinc-500" />}
                endIcon={
                  <Button
                    variant="none"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeClosed className="ml-1 size-6 text-zinc-500" />
                    ) : (
                      <Eye className="ml-1 size-6 text-zinc-500" />
                    )}
                  </Button>
                }
              />
            )}
          />
        </FormItem>

        <Button
          variant="none"
          onPress={handleSubmit(onSubmit)}
          className="mt-5 rounded-full bg-teal-500">
          <Text className="text-lg font-semibold text-white">Get Started</Text>
        </Button>

        <Link
          href="/login"
          className="mt-auto text-center text-base font-semibold text-zinc-400 dark:text-zinc-600">
          Already have an account? <Text className="text-teal-500 underline">Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
