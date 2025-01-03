// 21522436 - Nguyễn Thị Hồng Nhung
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { z } from 'zod';

import { FormItem } from '~/components/formItem';
import SocialLogin from '~/components/socialLogin';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Mail, Lock, Eye, EyeClosed } from '~/lib/icons/IconList';
import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

// Định nghĩa schema Zod cho form
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Hàm submit
  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Failed', error.message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <View className="flex-grow">
      <Spinner visible={isSubmitting} />
      <View className="flex-grow bg-white px-6 py-3 dark:bg-black">
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
        <Text className="text-right text-teal-500">Forgot password?</Text>
        <Button
          variant="none"
          onPress={handleSubmit(onSubmit)}
          className="mt-3 rounded-full bg-teal-500">
          <Text className="text-lg font-semibold text-white">Sign in</Text>
        </Button>
        <View className="mt-3">
          <Text className="mb-3 text-center text-zinc-600 dark:text-zinc-400">Or</Text>
          <SocialLogin />
        </View>

        <Link
          href="/register"
          className="mt-auto text-center text-base font-semibold text-zinc-400 dark:text-zinc-600">
          Don't have an account? <Text className="text-teal-500 underline">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
