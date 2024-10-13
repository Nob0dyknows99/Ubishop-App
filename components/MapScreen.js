import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert, Dimensions, Button, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location'; // Importar módulo de ubicación de Expo
import MapView, { Marker } from 'react-native-maps'; // Importar componentes de mapa
import { Ionicons } from '@expo/vector-icons'; // Importar íconos de Expo

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null); // Estado para el marcador seleccionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal
  const mapRef = useRef(null); // Referencia del mapa

  // Array de ubicaciones adicionales para los marcadores
  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: 'Lugar A',
      description: 'Descripción del Lugar A',
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      id: 2,
      title: 'Lugar B',
      description: 'Descripción del Lugar B',
      latitude: 37.78925,
      longitude: -122.4334,
    },
    {
      id: 3,
      title: 'Lugar C',
      description: 'Descripción del Lugar C',
      latitude: 37.79025,
      longitude: -122.4344,
    },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
        setLoading(false);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const goToLocation = (latitude, longitude) => {
    // Función para centrar el mapa en la ubicación seleccionada
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000); // Animación de 1 segundo
    setModalVisible(false); // Cerrar el modal
  };

  const goToMyLocation = () => {
    // Función para centrar el mapa en la ubicación actual del usuario
    if (location && location.coords) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!location || !location.coords) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ubicación no disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Asignar la referencia del mapa
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Mi Ubicación"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => {
              setSelectedMarker(marker); // Establecer el marcador seleccionado
              setModalVisible(true); // Mostrar el modal
            }}
          />
        ))}
      </MapView>

      {/* Botón flotante para ir a la ubicación del usuario */}
      <TouchableOpacity style={styles.myLocationButton} onPress={goToMyLocation}>
        <Ionicons name="locate" size={18} color="white" />
      </TouchableOpacity>

      {/* Modal para mostrar la información del marcador seleccionado */}
      {selectedMarker && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMarker.title}</Text>
              <Text>{selectedMarker.description}</Text>
              <Button
                title="Ir a la ubicación"
                onPress={() => goToLocation(selectedMarker.latitude, selectedMarker.longitude)}
              />
              <Button
                title="Cerrar"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.4,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 30,
    right: 8,
    backgroundColor: '#0000ff',
    borderRadius: 30,
    padding: 10,
    elevation: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MapScreen;
