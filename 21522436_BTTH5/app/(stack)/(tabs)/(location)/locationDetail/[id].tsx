import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Dimensions,
  Image,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text } from "@/components/ui/text";
import { supabase } from "@/supabase/supabase";
import { Button } from "@/components/ui/button";

const { width } = Dimensions.get("window");

const LocationDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Get dynamic route parameter
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [data, setData] = useState<any>(null); // Data state
  const navigation = useNavigation(); // For setting the header title

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!id) return; // Ensure `id` exists

        const { data: location, error } = await supabase
          .from("location") // Replace with your actual table name
          .select("*")
          .eq("id", id)
          .single(); // Fetch a single item matching the id

        if (error) {
          throw error;
        }

        setData(location);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  // Update the header title based on the fetched location title
  useEffect(() => {
    if (data?.title) {
      navigation.setOptions({
        title: data.title, // Display the title in the header
      });
    }
  }, [data?.title]);

  console.log("data", data);

  return (
    <View className="w-full h-full">
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color="#fe183c" />
        </View>
      ) : (
        <ScrollView
          className="flex-1 flex flex-col gap-3"
          style={{ width: width, height: width }}
        >
          {/* Image */}
          <Image
            source={{ uri: data?.img }} // Adjust the field name if it's different
            resizeMode="contain"
            className="bg-white aspect-square object-contain"
          />

          {/* Title */}
          <View className="p-2">
            <Text className="text-2xl font-bold text-zinc-900 ">
              {data?.title}
            </Text>
          </View>

          <View className="p-2">
            <Text className="text-xl text-zinc-900 ">
              {data?.address}
            </Text>
          </View>

          <Button variant="outline" onPress={() => router.push(`/map/${id}`)}>
            <Text>Xem trên bản đồ</Text>
          </Button>

          {/* Bottom padding */}
          <View className="pb-20" />
        </ScrollView>
      )}
    </View>
  );
};

export default LocationDetailScreen;
