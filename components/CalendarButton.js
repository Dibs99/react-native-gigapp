import React, {useContext, useState} from 'react';
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
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';

const EVENT_TITLE = 'lunch';

const TIME_NOW_IN_UTC = moment.utc();

const utcDateToString = momentInUTC => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};

function CalendarButton() {
  RNCalendarEvents.authorizeEventStore().then(status => console.log(status));
  const value = useContext(GlobalContext);
  const eventsToSave = value.gigs.filter(gig => gig.calendarId === null);
  const defaultCalendar = RNCalendarEvents.findCalendars().then(res =>
    res.filter(calendar => calendar.isPrimary === true),
  );

  const formatStartTime = time => {
    if (time[0].includes(':')) {
      return `0${time[0]}:00.000Z`;
    } else {
      return `${time[0]}:00:00.000Z`;
    }
  };

  const formatEndTime = (time, hrs) => {
    const num = time[0].split(':');
    const firstNum = parseInt(num[0]);
    const secNum = parseInt(num[1]);
    const hoursSplit = hrs.split('h');
    const hours = parseInt(hoursSplit[0]);
    let endTime = firstNum + hours;

    if (time[0].includes(':')) {
      return `${endTime}:${secNum}:00.000Z`;
    } else {
      return `${endTime}:00:00.000Z`;
    }
  };

  const t = eventsToSave[2].startTime.split('p');
  const testHrs = '3hrs';
  console.log(formatEndTime(t, testHrs));

  const saveEvents = () => {
    eventsToSave.map(event => {
      const dateFormat = event.date
        .split('.')
        .reverse()
        .join('-');
      const startTimeFormat = event.startTime.split('p');
      const endTimeFormat = startTimeFormat[0];

      RNCalendarEvents.saveEvent(event.gig, {
        calendarId: defaultCalendar.id,
        startDate: `${dateFormat}T${formatStartTime(startTimeFormat)}`, //pm times put it on the next day...in the morning
        endDate: '2020-07-09T08:00:00.000Z',
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => {}}>
        <Text>Add {EVENT_TITLE} to calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CalendarButton;
