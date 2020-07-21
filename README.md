This will be an internal tool for music agencies. When dealing with many events and many artists, information can become fragmented. What's on the calendar can be different to what was sent to the artist, and of course details can change before the event. The goal of this app is to have 1 sql database containing all the info. When an artist accepts a booking, their calendar will update with the information, and change if the information changes.

```Javascript
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