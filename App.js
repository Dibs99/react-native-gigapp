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

const Drawer = createDrawerNavigator();
export const GlobalContext = React.createContext({});
export const RerenderContext = React.createContext({});

function App() {
  const [gigs, setGigs] = useState();

  useEffect(() => {
    axios.get('http://188.166.240.15:4000/gigs').then(res => {
      setGigs(res.data.gigs);
    });
  }, []);

  const updateState = () => {
    axios.get('http://188.166.240.15:4000/gigs').then(res => {
      setGigs(res.data.gigs);
    });
  };

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={{gigs: gigs, styles: styles}}>
        <RerenderContext.Provider value={{render: updateState}}>
          <Drawer.Navigator>
            <Drawer.Screen name="HomeIndex" component={Home} />
            <Drawer.Screen name="Pending" component={PendingIndex} />
            <Drawer.Screen name="Booked" component={BookedIndex} />
            <Drawer.Screen name="Calendar" component={CalendarButton} />
          </Drawer.Navigator>
        </RerenderContext.Provider>
      </GlobalContext.Provider>
    </NavigationContainer>
  );
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
});

export default App;
