/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeIndex from './components/HomeIndex';
import PendingIndex from './components/PendingIndex';
import BookedIndex from './components/BookedIndex';
import Home from './components/Home';
import axios from 'axios';
import CalendarButton from './components/CalendarButton';
import CalendarPage from './components/CalendarPage';
import {Loading} from './components/Loading';
import {Login} from './components/Login';
import DeviceInfo from 'react-native-device-info';

const Drawer = createDrawerNavigator();
export const GlobalContext = React.createContext({});
export const RerenderContext = React.createContext({});

function App() {
  const [gigs, setGigs] = useState('');
  const [authenticate, setAuthenticate] = useState('Loading');
  const [userName, setUserName] = useState('David');
  const [database, setDatabase] = useState('gigs');
  const [databasePassword, setDatabasePassword] = useState('gigletts');
  const [render, setRender] = useState('render');
  const deviceId = DeviceInfo.getUniqueId();
  const loginData = {
    setUserName: setUserName,
    setDatabase: setDatabase,
    setDatabasePassword: setDatabasePassword,
    database: database,
    databasePassword: databasePassword,
    deviceId: deviceId,
    userName: userName,
    setAuthenticate: setAuthenticate,
    setGigs: setGigs,
  };

  useEffect(() => {
    axios
      .post('http://10.0.2.2:4000/gigs', {
        data: {
          deviceId: deviceId,
        },
      })
      .then(res => {
        if (gigs === '' && authenticate === 'Loading') {
          setAuthenticate('Authenticated');
          setGigs(res.data.gigs);
          setUserName(res.data.name[0].name);
        } else {
          setAuthenticate('Not Authenticated');
        }
      })
      .catch(err => {
        console.log('app useEffect ' + err);
        setAuthenticate('Not Authenticated');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateState = () => {
    axios
      .get('http://10.0.2.2:4000/gigs')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  if (authenticate === 'Loading') {
    return <Loading />;
  }
  if (authenticate === 'Not Authenticated') {
    return <Login loginData={loginData} />;
  } else {
    return (
      <NavigationContainer>
        <GlobalContext.Provider
          value={{
            gigs: gigs,
            styles: styles,
            userName: userName,
          }}>
          <RerenderContext.Provider value={{render: updateState}}>
            <Drawer.Navigator>
              <Drawer.Screen name="HomeIndex" component={Home} />
              <Drawer.Screen name="Pending" component={PendingIndex} />
              <Drawer.Screen name="Booked" component={BookedIndex} />
              <Drawer.Screen name="Calendar" component={CalendarPage} />
            </Drawer.Navigator>
          </RerenderContext.Provider>
        </GlobalContext.Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'aliceblue',
  },
  listItem: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    justifyContent: 'center',
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
  homeButtonContainer: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  homeButton: {
    backgroundColor: 'blue',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    margin: '3%',
  },
});

export default App;
