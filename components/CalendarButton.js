import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {GlobalContext} from '../App';
import {RerenderContext} from '../App';
import RNCalendarEvents from 'react-native-calendar-events';
import axios from 'axios';

//format hours of event

const formatStartTime = time => {
  const startTimeFormat = time.split('p');
  const startTime = startTimeFormat[0];
  if (startTime.includes(':')) {
    return startTime.split('').length > 4
      ? `${startTime}:00.000Z`
      : `0${startTime}:00.000Z`;
  } else {
    return startTime.split('').length > 1
      ? `${startTime}:00:00.000Z`
      : `0${startTime}:00:00.000Z`;
  }
};

const formatEndTime = (time, hrs) => {
  const num = time[0].split(':');
  const firstNum = Number(num[0]);
  const secNum = Number(num[1]);
  const hoursSplit = hrs.split('h');
  const hours = Number(hoursSplit[0]);
  let endTime = firstNum + hours;

  if (time[0].includes(':')) {
    return `${endTime}:${secNum}:00.000Z`;
  } else {
    return `${endTime}:00:00.000Z`;
  }
};

function CalendarButton() {
  const value = useContext(GlobalContext);
  const rerender = useContext(RerenderContext);
  const style = value.styles;

  //What events need saving, and count them
  const eventsToSave = value.gigs.filter(
    gig => gig.calendarId === null && gig.state === 'Booked',
  );
  const [countEventsToSave, setCountEventsToSave] = useState(
    eventsToSave.length,
  );
  // events that need updating and count them
  const eventsWithCalendarId = value.gigs.filter(gig => gig.calendarId != null);
  let updateArray = [];
  const requests = eventsWithCalendarId.map(gig =>
    RNCalendarEvents.findEventById(gig.calendarId)
      .then(res => {
        if (res) {
          const resStartTime = res.startDate.split('T');
          const gigStartTime = formatStartTime(gig.startTime);
          if (
            res.description !== gig.description ||
            resStartTime[1] !== gigStartTime
          ) {
            updateArray.push({
              calStartTime: resStartTime[1],
              datStartTime: gigStartTime,
              calDescription: res.description,
              datDescription: gig.description,
              calId: gig.calendarId,
              date: gig.date,
            });
          }
        }
      })
      .catch(err => console.log(err)),
  );
  const [countUpdates, setCountUpdates] = useState('0');
  const [viewUpdates, setViewUpdates] = useState([
    {
      calStartTime: '',
      datStartTime: '',
      calDescription: '',
      datDescription: '',
      calId: '',
      date: '',
    },
  ]);

  //on render
  useEffect(() => {
    RNCalendarEvents.authorizeEventStore().then(status => console.log(status));
    if (countUpdates === '0') {
      Promise.all(requests)
        .then(() => {
          setCountUpdates(updateArray.length);
          setViewUpdates(updateArray);
          console.log(updateArray);
        })
        .catch(err => console.log('Promise ' + err));
    }
  }, [
    countUpdates,
    eventsToSave.length,
    requests,
    updateArray,
    updateArray.length,
  ]);

  //What is the devices default calendar
  async function defaultCalendar() {
    const result = await RNCalendarEvents.findCalendars();
    const filter = result.filter(calendar => calendar.isPrimary === true);
    return filter[0].id;
  }

  // save events and update database with event id

  const saveEvent = async event => {
    const dateFormat = event.date
      .split('.')
      .reverse()
      .join('-');
    const calendar = await defaultCalendar();
    RNCalendarEvents.saveEvent(event.gig, {
      calendarId: calendar,
      startDate: `${dateFormat}T${formatStartTime(event.startTime)}`, //pm times put it on the next day...in the morning
      endDate: `${dateFormat}T${formatEndTime(
        event.startTime,
        event.gigLength,
      )}`,
      description: event.description,
    })
      .then(async res => {
        await axios.patch('http://10.0.2.2:4000/gigs/calendar', {
          calendarId: res,
          id: event.id,
          description: event.description,
        });
      })
      .then(() => rerender.render())
      .catch(err => console.log('saveEvent ' + err));
  };

  const saveEvents = () => {
    Promise.all(eventsToSave.map(event => saveEvent(event))).then(() =>
      setCountEventsToSave('0'),
    );
  };

  //updates events that need updating
  const updateEventsDescription = () => {
    Promise.all(
      updateArray.map(gig => {
        const removeAdd = async () => {
          await RNCalendarEvents.removeEvent(`${gig.calId}`)
            .then(() => saveEvent(gig))
            .catch(err => console.log('event update ' + err));
        };
        return removeAdd();
      }),
    )
      .then(() => setCountUpdates(0), setViewUpdates(''))
      .catch(err => console.log('updateEvents ' + err));
  };

  // Update View

  const testData = [
    {
      calStartTime: 'asd',
      datStartTime: 'dsa',
      calDescription: 'asd',
      datDescription: 'dsa',
      calId: '1',
      date: 'asd',
    },
  ];
  const Item = ({e}) => {
    if (e.calStartTime != e.datStartTime) {
      return (
        <Text style={style.descriptionText}>
          Gig on {e.date} will update start time from {e.calStartTime} to{' '}
          {e.datStartTime}
        </Text>
      );
    }
    if (e.calDescription != e.datDescription) {
      return (
        <Text style={style.descriptionText}>
          Gig on {e.date} will update description from {e.calDescription} to{' '}
          {e.datDescription}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={style.homeButtonContainer}>
      <TouchableOpacity style={style.homeButton} onPress={() => saveEvents()}>
        <Text style={localStyles.buttonText}>
          Add {countEventsToSave} event(s) to your default calendar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.homeButton}
        onPress={() => updateEventsDescription()}>
        <Text style={localStyles.buttonText}>
          Update {countUpdates} event(s) to your default calendar
        </Text>
      </TouchableOpacity>
      <SafeAreaView style={localStyles.descriptionContainer}>
        <FlatList
          data={viewUpdates}
          renderItem={({item}) => <Item e={item} />}
          keyExtractor={gig => gig.calId}
        />
      </SafeAreaView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: 'white',
    padding: 5,
  },
  descriptionContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: '95%',
    height: '30%',
  },
});

export default CalendarButton;
