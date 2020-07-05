import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>I'm Home, I'm going to render all the indexs</Text>
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
      </View>
    </View>
  );
}

const style = StyleSheet.create({
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
  buttonText: {
    fontSize: 30,
    color: 'white',
    paddingVertical: 10,
  },
});
export default Home;
