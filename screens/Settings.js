import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Settings = ({ mapType, setMapType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valitse karttatyyppi:</Text> {}
      <Picker
        selectedValue={mapType}
        onValueChange={(itemValue) => setMapType(itemValue)}
      >
        <Picker.Item label="Standard" value="standard" />
        <Picker.Item label="Satelliitti" value="satellite" />
        <Picker.Item label="Korkeuskuva" value="terrain" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Settings;
