import React, { useState } from "react";
import { Dimensions, ScrollView, View, Image } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextField } from "react-native-ui-lib";
import { useColorScheme } from "nativewind";
import Spinner from "react-native-loading-spinner-overlay";
import ImageUploadType1 from "@/components/imageUpload/type1";
import { supabase } from "@/supabase/supabase";
import * as FileSystem from "expo-file-system";
import { Description } from "@rn-primitives/dialog";
import LocateSelector from "@/components/locateSelect/type1";
import DarkModeSwitch from "@/components/darkModeOption/switch";
import DarkModeText from "@/components/darkModeOption/text";
import { useLocationStore } from "@/components/locateSelect/locationStore";

const { width } = Dimensions.get("window");

interface ProfileFormData {
  title?: string;
}

export default function ProfileForm() {
  const { colorScheme } = useColorScheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirtyFields, setIsDirtyFields] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    title: "",
  });
  const [imagePath, setImagePath] = useState<string>("");

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirtyFields(true);
    setError(null);
  };

  // Function to generate a unique filename
  const generateUniqueFileName = (originalPath: string) => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const extension = originalPath.split(".").pop();
    return `${timestamp}-${random}.${extension}`;
  };
  const selectedLocation = useLocationStore((state) => state.selectedLocation);

  // Function to upload image to Supabase Storage
  const uploadImageToSupabase = async (uri: string): Promise<string> => {
    try {
      // Read the file as base64
      const fileBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Generate unique filename
      const fileName = generateUniqueFileName(uri);

      // Convert base64 to a format suitable for Supabase
      const fileBlob = `data:image/jpeg;base64,${fileBase64}`; // Adjust MIME type as needed

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("BTTH5")
        .upload(`public/${fileName}`, fileBlob, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("BTTH5").getPublicUrl(`public/${fileName}`);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const submitHandler = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.title || !imagePath) {
        throw new Error("Please fill in all fields and upload an image");
      }

      // Upload image first
      //   const imageUrl = await uploadImageToSupabase(imagePath);

      // Insert data into locations table
      const { data, error } = await supabase
        .from("location")
        .insert([
          {
            title: formData.title,
            img: imagePath,
            lat: selectedLocation?.latitude,
            long: selectedLocation?.longitude,
            address: selectedLocation?.title
          },
        ])
        .select();

      if (error) throw error;

      // Reset form after successful submission
      setFormData({
        title: "",
      });
      setImagePath("");
      setIsDirtyFields(false);

      console.log("Successfully submitted:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTextFieldProps = (
    label: string,
    field: keyof ProfileFormData,
    options?: {
      keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
      validation?: ((value: string) => boolean)[];
      validationMessages?: string[];
    }
  ) => ({
    label,
    value: formData[field],
    onChangeText: (value: string) => updateField(field, value),
    keyboardType: options?.keyboardType || "default",
    validate: ["required", ...(options?.validation || [])],
    validationMessage: [
      "This field is required",
      ...(options?.validationMessages || []),
    ],
    maxLength: 30,
    containerStyle: { width: "100%" },
    fieldStyle: {
      backgroundColor: colorScheme === "dark" ? "#18181b" : "#f4f4f5",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: colorScheme === "dark" ? "#27272a" : "#e4e4e7",
    },
  });


  return (
    <View className="flex-1">
      <Spinner visible={isSubmitting} />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
        style={{ flex: 1 }}
      >
        <TextField {...getTextFieldProps("Title", "title")} />

        <View className="flex-1 my-8 bg-zinc-100 dark:bg-zinc-900 p-8">
          {error && (
            <Text className="text-red-500 mt-2 text-center">{error}</Text>
          )}

          {imagePath ? (
            <View className="mb-8 justify-center items-center">
              <Image
                source={{ uri: imagePath }}
                className="w-full h-48 aspect-[4/3] mt-4 rounded-lg mb-3 border-zinc-600 border-dashed border-2"
              />
              <ImageUploadType1
                onImageSelect={(path) => {
                  setImagePath(path);
                  setIsDirtyFields(true);
                  console.log("Selected image path:", path);
                }}
                triggerContent={
                  <Button variant="outline">
                    <Text>Chọn ảnh hoặc chụp ảnh</Text>
                  </Button>
                }
              />
            </View>
          ) : (
            <View className="w-full h-48 mt-4 rounded-lg border-zinc-600 border-dashed border-2">
              <ImageUploadType1
                onImageSelect={(path) => {
                  setImagePath(path);
                  setIsDirtyFields(true);
                  console.log("Selected image path:", path);
                }}
                triggerContent={
                  <Button variant="outline">
                    <Text>Chọn ảnh hoặc chụp ảnh</Text>
                  </Button>
                }
              />
            </View>
          )}
        </View>
        <View className="flex-1 mb-8 bg-zinc-100 dark:bg-zinc-900 p-8">
          <LocateSelector />
          {selectedLocation ? (
        <View>
          <Text>Địa điểm đã chọn:</Text>
          <Text>Vĩ độ: {selectedLocation.latitude}</Text>
          <Text>Kinh độ: {selectedLocation.longitude}</Text>
          <Text>Địa chỉ: {selectedLocation.title}</Text>
        </View>
      ) : (
        <Text>Chưa chọn địa điểm</Text>
      )}
        </View>
        <DarkModeText />
      </ScrollView>

      <Button
        onPress={submitHandler}
        className="m-4 rounded-full z-50"
        disabled={!isDirtyFields || isSubmitting}
      >
        <Text>Save</Text>
      </Button>
    </View>
  );
}
