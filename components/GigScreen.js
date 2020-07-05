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
import {GlobalContext} from '../App';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import Map from './Map';
import GigScreenDynamicButtons from './GigScreenDynamicButtons';

function GigScreen({route}) {
  const value = useContext(GlobalContext);
  const matchGig = value.gigs.filter(
    matchedGig => matchedGig.gig === route.name,
  );
  const gig = matchGig[0];

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map gig={gig} />
      </View>
      <GigScreenDynamicButtons gig={gig} />
      <View style={styles.buttonContainer}>
        <View style={styles.box1}>
          <Text style={styles.detailsText}>{gig.gigLength}</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.detailsText}>{gig.pay}</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.detailsText}>{gig.startTime}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.descriptionContainer}>
        <ScrollView>
          <Text style={styles.descriptionText}>{gig.description}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mapContainer: {
    height: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',

    paddingVertical: '3%',
  },
  button: {
    width: '32%',
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    paddingVertical: 10,
  },
  detailsText: {
    color: 'purple',
    fontSize: 20,
    paddingVertical: 10,
  },
  box1: {
    backgroundColor: 'yellow',
    width: '32%',
    alignItems: 'center',
    borderRadius: 10,
  },
  box2: {
    backgroundColor: 'aliceblue',
    width: '32%',
    alignItems: 'center',
    borderRadius: 10,
  },
  box3: {
    backgroundColor: 'pink',
    width: '32%',
    alignItems: 'center',
    borderRadius: 10,
  },
  descriptionContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: '95%',
    height: '20%',
    marginTop: '3%',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    padding: '3%',
  },
});

export default GigScreen;
