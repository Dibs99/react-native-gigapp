import React, {useState, useCallback, useEffect, useContext} from 'react';
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
import axios from 'axios';
import {RerenderContext} from '../App';

function GigScreenDynamicButtons({gig}) {
  const rerender = useContext(RerenderContext);

  const handleURL = () => {
    if (gig.latitude) {
      return Linking.openURL(
        `geo:${gig.latitude},${gig.longitude}?q=${gig.gig}`,
      );
    } else {
      return null;
    }
  };

  const sendToDatabase = status => {
    axios
      .patch('http://188.166.240.15:4000/gigs', {
        state: status,
        id: gig.id,
      })
      .then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        },
      )
      .then(() => rerender.render());
  };
  if (gig.state === 'Pending') {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleURL()}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sendToDatabase('Booked');
          }}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => sendToDatabase('Denied')}>
          <Text style={styles.buttonText}>Deny</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleURL()}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
});

export default GigScreenDynamicButtons;
