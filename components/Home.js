import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../App';

function Home({navigation}) {
  const value = useContext(GlobalContext);
  const style = value.styles;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Hi {value.userName}</Text>
      <View style={style.homeButtonContainer}>
        <TouchableOpacity
          style={style.homeButton}
          onPress={() => navigation.navigate('Pending')}>
          <Text style={style.buttonText}>Pending Gigs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.homeButton}
          onPress={() => navigation.navigate('Booked')}>
          <Text style={style.buttonText}>Booked Gigs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.homeButton}
          onPress={() => navigation.navigate('Calendar')}>
          <Text style={style.buttonText}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
