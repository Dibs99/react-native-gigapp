import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

function Map(props) {
  const coordinates = {
    latitude: Number(props.gig.latitude),
    longitude: Number(props.gig.longitude),
  };
  if (props.gig.latitude) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -36.858297,
          longitude: 174.759679,
          latitudeDelta: 0.275,
          longitudeDelta: 0.2121,
        }}>
        <Marker coordinate={coordinates} />
      </MapView>
    );
  } else {
    return <Text>No Map!</Text>;
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  noMap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;
