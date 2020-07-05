import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../App';

function PendingHome({navigation}) {
  const value = useContext(GlobalContext);
  const pendingGig = value.gigs.filter(gig => gig.state === 'Pending');
  const style = value.styles;

  const pressHandler = gig => {
    navigation.navigate(gig);
  };

  return (
    <View>
      <Text style={style.description}>Tap the gig to view details</Text>
      <FlatList
        data={pendingGig}
        renderItem={({item}) => (
          <TouchableOpacity
            style={style.listItem}
            onPress={() => pressHandler(item.gig)}>
            <View style={style.listItemView}>
              <Text>{item.gig}</Text>
              <Text>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

export default PendingHome;
