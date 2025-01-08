import SingleMarkerMap from "@/components/locateSelect/singleMarker";
import React from "react";
import { SafeAreaView } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SingleMarkerMap />
    </SafeAreaView>
  );
};

export default App;
