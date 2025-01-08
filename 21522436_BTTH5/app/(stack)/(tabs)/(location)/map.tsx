import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 10.875957;
const LONGITUDE = 106.806929;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName: any, e: any) {
  console.log(eventName, e.nativeEvent);
}

class OnPoiClick extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      poi: null,
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };

    this.onPoiClick = this.onPoiClick.bind(this);
  }

  onPoiClick(e: any) {
    const poi = e.nativeEvent;

    this.setState({
      poi,
    });

    console.log("Poi", poi);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPoiClick={this.onPoiClick}
        >
          {this.state.poi && (
            <Marker
              coordinate={this.state.poi.coordinate}
              title={this.state.poi.name}
            />
          )}
          {/* <Marker
            coordinate={this.state.b}
            onSelect={(e) => log("onSelect", e)}
            onDrag={(e) => log("onDrag", e)}
            onDragStart={(e) => log("onDragStart", e)}
            onDragEnd={(e) => log("onDragEnd", e)}
            onPress={(e) => log("onPress", e)}
            draggable
            title={this.state.poi.name}
          /> */}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OnPoiClick;
