import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { supabase } from "@/supabase/supabase";

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

  useEffect(() => {
    if (data?.title) {
      navigation.setOptions({
        title: data.title, // Display the address in the header
      });
    }
  }, [data?.title]);

  // Show a loading indicator while fetching data
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show an error message if data is null or incomplete
  if (!data || !data.latitude || !data.longitude) {
    return (
      <View style={styles.centered}>
        <Text>No location data available</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        title={data.title}
        description={data.address}
      />
    </MapView>
  );
};

export default LocationDetailScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
