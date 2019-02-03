import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const About = () => {
  const goToHome = () => {
    Actions.home();
  };
  return (
    <Container>
      <TouchableOpacity style={{ margin: 128 }} onPress={goToHome}>
        <Text>This is ABOUT</Text>
      </TouchableOpacity>
      <MapView
        region={{
          latitude: 48.117949,
          longitude: 7.853377,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider={null}
        rotateEnabled={false}
        style={{ flex: 1 }}
        showsUserLocation
      >
        <MapView.UrlTile urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png" />
      </MapView>
    </Container>
  );
};
export default About;
