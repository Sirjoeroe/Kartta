import React from 'react';
import { Appbar } from 'react-native-paper';

const MainAppBar = ({ backgroundColor, title, icon, getUserPosition, toggleMapType }) => {
  return (
    <Appbar.Header style={{ backgroundColor }}>
      <Appbar.Content title={title} />
      
      {/* Paikannuspainike */}
      <Appbar.Action
        icon={icon}
        onPress={getUserPosition}
      />
      
      {/* Karttatyyppipainike */}
      <Appbar.Action
        icon="map"
        onPress={toggleMapType}
      />
    </Appbar.Header>
  );
};

export default MainAppBar;
