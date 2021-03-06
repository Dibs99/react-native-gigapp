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
  const styles = value.styles;

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

export default GigScreen;
