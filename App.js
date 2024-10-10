import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Provider as PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import Map from './screens/Map';

export default function App() {
  const [location, setLocation] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [gpsStatus, setGpsStatus] = useState('search');
  const [markers, setMarkers] = useState([]);

  const getUserPosition = async () => {
    try {
      setGpsStatus('search');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setGpsStatus('not_granted');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setGpsStatus('found');
    } catch (error) {
      console.error(error);
    }
  };

  const showMarker = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((prevMarkers) => [...prevMarkers, coordinate]);
  };

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <MainAppBar
          backgroundColor="blue"
          title="Map App"
          icon={gpsStatus === 'found' ? 'crosshairs-gps' : 'crosshairs'}
          getUserPosition={getUserPosition}
          toggleMapType={toggleMapType}
        />
        <Map 
          region={location} 
          mapType={mapType} 
          markers={markers}
          showMarker={showMarker} 
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});
