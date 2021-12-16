import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const StoreLocator = () => {
  return (
    <View>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          toolbarEnabled={true}
          showsBuildings={true}
          showsMyLocationButton={true}
          showsScale={true}
          showsTraffic={true}
          zoomControlEnabled={true}
          pitchEnabled={true}
          showsCompass={true}
          showsUserLocation={true}
          showsPointsOfInterest
          userLocationCalloutEnabled={true}
          initialRegion={{
            latitude: 12.843085,
            longitude: 77.678937,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          showUserLocation={true}>
          <Marker
            title="NeoStore"
            coordinate={{
              latitude: 12.843085,
              longitude: 77.678937,
            }}
          />
          <Marker
            title="NeoStore"
            coordinate={{
              latitude: 28.575115,
              longitude: 77.324386,
            }}
          />
          <Marker
            title="NeoStore"
            coordinate={{
              latitude: 28.466518,
              longitude: 77.029121,
            }}
          />
          <Marker
            title="NeoStore"
            coordinate={{
              latitude: 23.021098,
              longitude: 72.569643,
            }}
          />
          <Marker
            title="NeoStore"
            coordinate={{
              latitude: 22.717417,
              longitude: 75.914491,
            }}
          />
        </MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mapcontainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: '20%',
    height: '15%',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
});
export default StoreLocator;
