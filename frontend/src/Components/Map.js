import React from 'react'
import MapView, { Marker } from 'react-native-maps';
function Map({latitude,longitude}) {
  return (
    <MapView
    style={{ flex: 1, marginTop:20 }}
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
  </MapView>
  )
}

export default Map