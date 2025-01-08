import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocationStore } from "./locationStore";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 10.87;
const LONGITUDE = 106.806;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SingleMarkerMap = () => {
  const navigation = useNavigation();
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(false);
  // Initial region state
  const [region, setRegion] = useState({
    latitude: selectedLocation?.latitude || LATITUDE,
    longitude: selectedLocation?.longitude || LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  // Separate marker state from selectedLocation
  const [currentMarker, setCurrentMarker] = useState<{
    latitude: number;
    longitude: number;
    title: string;
  } | null>(
    selectedLocation
      ? null
      : null
  );

  // When component mounts, animate to selectedLocation if it exists
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000
      );
    }
  }, []);

  const handleMapPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log("Map pressed at:", latitude, longitude);

    try {
      setLoading(true);
      const response = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=vi&apiKey=JvbPZTuHiSKY7roWnFo4_VhjKfvcHQzadwKAg-HI0pc`
      );
      const data = await response.json();
      console.log("API Response:", data);

      const title = data?.items?.[0]?.title || "Không thể lấy địa chỉ";

      await setCurrentMarker({
        latitude,
        longitude,
        title,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching address:", error);
      Alert.alert("Lỗi", "Không thể lấy thông tin địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleSave = async () => {
    console.log("Save");
    setLoading(true);

    if (!currentMarker) {
      Alert.alert("Lỗi", "Vui lòng chọn một vị trí trên bản đồ");
      return;
    }

    // Update global location store
    await setSelectedLocation(currentMarker);
    setLoading(true);

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSave} title="Lưu" disabled={!currentMarker} />
      ),
    });
  }, [navigation, currentMarker]);

  const handleMapReady = () => {
    if (selectedLocation) {
      setRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  const [rerender, setRerender] = useState(Math.random());

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <MapView
        ref={mapRef}
        key={rerender} 
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
        onMapReady={handleMapReady}
        showsUserLocation={true}
      >
        {currentMarker && (
          <Marker
            title={currentMarker.title}
            coordinate={{
              latitude: currentMarker.latitude,
              longitude: currentMarker.longitude,
            }}
            draggable
            onDragEnd={(e) => {
              setCurrentMarker({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SingleMarkerMap;
