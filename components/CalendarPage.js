import React, {useContext, useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import {GlobalContext} from '../App';
import CalendarButton from './CalendarButton';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CalendarPage({navigation}) {
  const value = useContext(GlobalContext);
  const globalStyle = value.styles;
  const bookedGigs = value.gigs.filter(e => e.state === 'Booked');

  const nextDays = bookedGigs.map(e => {
    const formatDate = e.date
      .split('.')
      .reverse()
      .join('-');
    return `${formatDate}`;
  });

  let newDaysObject = {};
  nextDays.forEach(e => {
    newDaysObject[e] = {
      selected: true,
      marked: true,
    };
  });

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Ionicons
            name="menu-outline"
            size={35}
            color="#000"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </View>
        <Text style={styles.headerText}>Calendar</Text>
      </View>
      <Calendar markedDates={newDaysObject} />
      <View styles={styles.localButtonContainer}>
        <CalendarButton />
      </View>
    </View>
  );
}

export default CalendarPage;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    letterSpacing: 1,
    paddingLeft: 20,
  },
  icon: {
    paddingLeft: 20,
    paddingTop: 3,
  },
});
