import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_URL, API_TOKEN } from '@env';

export default function App() {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const [region, setRegion] = useState(initial);
  const [address, setAddress] = useState('');

  const fetchCoordinates = () => {
    fetch(`${API_URL}${address}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const { lat, lng } = data.results[0].locations[0].displayLatLng;
      console.log(data.results[0].locations[0].displayLatLng)
      setRegion({...region, latitude: lat, longitude: lng})
    })
    .catch(error => { 
        Alert.alert('Error', error.message); 
    });


  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={region} />
      </MapView>

      <TextInput
        style={{fontSize: 18, width: 200}}
        placeholder='address'
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.button}>
        <Button title="Show" onPress={() => fetchCoordinates()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  button: {
    marginTop: 5,
    marginBottom: 15
  }
});