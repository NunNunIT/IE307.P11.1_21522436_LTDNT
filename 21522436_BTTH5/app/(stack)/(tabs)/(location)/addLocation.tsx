import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, View, Image, Alert } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextField } from "react-native-ui-lib";
import { useColorScheme } from "nativewind";
import Spinner from "react-native-loading-spinner-overlay";
import ImageUploadType1 from "@/components/imageUpload/type1";
import { supabase } from "@/supabase/supabase";
import * as FileSystem from "expo-file-system";
import { Description } from "@rn-primitives/dialog";
import LocateSelector from "@/components/locateSelect/currentLocation";
import DarkModeSwitch from "@/components/darkModeOption/switch";
import DarkModeText from "@/components/darkModeOption/text";
import { useLocationStore } from "@/components/locateSelect/locationStore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import { uploadFileFromUri } from "@/supabase/storage";
import { unicodeToAscii } from "@/lib/func/unicode";
import { toast } from "sonner-native";
import * as Notifications from "expo-notifications";

const { width } = Dimensions.get("window");

interface ProfileFormData {
  title?: string;
}

export default function ProfileForm() {
  const { colorScheme } = useColorScheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirtyFields, setIsDirtyFields] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    title: "",
  });
  const [imagePath, setImagePath] = useState<string>("");
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const { setSelectedLocation } = useLocationStore();

  // Gán selectedLocation là null mỗi khi vào trang
  useEffect(() => {
    setSelectedLocation(null); // Đặt giá trị selectedLocation là null
  }, [setSelectedLocation]);

  // State for map region
  const [mapRegion, setMapRegion] = useState({
    latitude: 10.87,
    longitude: 106.806,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Update map region when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setIsMapLoading(true);
      setMapRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      // Add a small delay to show loading state
      setTimeout(() => {
        setIsMapLoading(false);
      }, 1000);
    }
  }, [selectedLocation]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Notification Permission",
          "Permission to send notifications is required."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error requesting notification permissions:", error);
      return false;
    }
  };

  const showNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Location Saved",
          body: "Your places saved",
        },
        trigger: null,
      });
    } catch (error) {
      console.log("Error showing notification:", error);
    }
  };

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirtyFields(true);
    setError(null);
  };

  const submitHandler = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.title || !imagePath) {
        throw new Error("Please fill in all fields and upload an image");
      }

      // const _data = await uploadFileFromUri(
      //   'BTTH5',
      //   `${unicodeToAscii(formData.title)}.${new Date().getTime()}.jpg`,
      //   imagePath
      // );

      // Insert data into locations table
      const { data, error } = await supabase
        .from("location")
        .insert([
          {
            title: formData.title,
            img: imagePath,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
            address: selectedLocation?.title,
          },
        ])
        .select();

      if (error) throw error;

      // Reset form after successful submission
      setFormData({
        title: "",
      });
      setImagePath("/place");
      setIsDirtyFields(false);

      console.log("Successfully submitted:", data);
      toast.success("New place added successfully");
      await showNotification();
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      toast.success("Error");
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

        <View className="flex-1 my-3 bg-zinc-100 dark:bg-zinc-900 p-2">
          {error && (
            <Text className="text-red-500 mt-2 text-center">{error}</Text>
          )}

          {imagePath ? (
            <View className="mb-3 justify-center items-center">
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
          <View className="mt-8 flex flex-row justify-around gap-2">
            <LocateSelector />

            <Button
              className="flex flex-row"
              onPress={() => {
                const uniqueKey = new Date().getTime(); // Tạo một key duy nhất
                router.push(`/choose-in-map?refreshKey=${uniqueKey}`);
              }}
            >
              <MaterialIcons name="map" size={24} color="white" />
              <Text>Chọn trên bản đồ</Text>
            </Button>
          </View>

          <View style={styles.mapContainer}>
            {isMapLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Hãy đợi...</Text>
              </View>
            ) : selectedLocation ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapPreview}
                region={mapRegion}
                onRegionChangeComplete={(region) => {
                  setMapRegion(region);
                }}
              >
                <Marker
                  key={`${selectedLocation.latitude}-${selectedLocation.longitude}`}
                  coordinate={selectedLocation}
                  title={selectedLocation.title}
                />
              </MapView>
            ) : (
              <View style={styles.placeholderContainer}>
                <Text>Chưa chọn địa điểm</Text>
              </View>
            )}
          </View>

          {selectedLocation && !isMapLoading && (
            <View className="mt-4">
              <Text className="font-medium">Địa điểm đã chọn:</Text>
              <Text>Vĩ độ: {selectedLocation.latitude}</Text>
              <Text>Kinh độ: {selectedLocation.longitude}</Text>
              <Text>Địa chỉ: {selectedLocation.title}</Text>
            </View>
          )}
        </View>
        {/* <DarkModeText /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
    backgroundColor: "#f4f4f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
  },
  mapPreview: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
