import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import BookedHome from './BookedHome';
import GigScreen from './GigScreen';
import {GlobalContext} from '../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
function BookedIndex({navigation}) {
  const value = useContext(GlobalContext);

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Booked Home"
          component={BookedHome}
          key="first key"
          options={{
            headerLeft: props => (
              <Ionicons
                {...props}
                name="menu-outline"
                size={35}
                color="#000"
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
              paddingTop: 3,
            },
          }}
        />
        {value.gigs.map(gig => (
          <Stack.Screen
            name={gig.gig}
            key={gig.id}
            component={GigScreen}
            options={() => ({
              title: `${gig.gig} - ${gig.date}`,
            })}
          />
        ))}
      </Stack.Navigator>
    </View>
  );
}

export default BookedIndex;
