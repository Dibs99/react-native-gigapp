import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
} from 'react-native';
import {GlobalContext} from '../App';
import axios from 'axios';

export function Login({loginData}) {
  const [lastName, setLastname] = useState('Haslett');
  return (
    <View>
      <Text>Login</Text>
      <Text>First Name</Text>
      <TextInput
        style={localStyle.textInput}
        onChangeText={text => loginData.setUserName(text)}
        value={loginData.userName}
      />
      <Text>Last Name</Text>
      <TextInput
        style={localStyle.textInput}
        onChangeText={text => setLastname(text)}
        value={lastName}
      />
      <Text>Database</Text>
      <TextInput
        style={localStyle.textInput}
        onChangeText={text => loginData.setDatabase(text)}
        value={loginData.database}
      />
      <Text>Database Password</Text>
      <TextInput
        style={localStyle.textInput}
        onChangeText={text => loginData.setDatabasePassword(text)}
        value={loginData.databasePassword}
      />
      <Button
        title="submit"
        onPress={() =>
          axios
            .post('http://10.0.2.2:4000/gigs', {
              data: {
                database: loginData.database,
                databasePassword: loginData.databasePassword,
                deviceId: loginData.deviceId,
                name: loginData.userName,
                lastName: lastName,
              },
            })
            .then(res => {
              loginData.setAuthenticate('Authenticated');
              loginData.setGigs(res.data.gigs);
              loginData.setUserName(res.data.name);
              
            })
            .catch(err => {
              console.log('login ' + err);
              loginData.setAuthenticate('Not Authenticated');
            })
        }
      />
    </View>
  );
}

const localStyle = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
