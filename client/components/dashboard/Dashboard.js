import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import MapView from "react-native-maps";
import LocationSearchBox from "../common/LocationSearchBox";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  locationBox: {
    flex: 2,
    paddingTop: 10
  }
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", errors: {} };

    this.goToHome = this.goToHome.bind(this);
  }
  goToHome() {
    Actions.home();
  }
  render() {
    return (
      <View style={styles.container}>
        <LocationSearchBox
          showButton={true}
          style={styles.locationBox}
          name={"searchLocation"}
          setLocation={this.setLocation}
          placeholder={"Enter Start Location"}
        />
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
      </View>
    );
  }
}
export default Dashboard;
