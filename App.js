import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar las pantallas desde la carpeta Screens
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'; // Nombre del ícono para la pestaña "Home"
            } else if (route.name === 'Productos') {
              iconName = 'pricetags'; // Ícono para la pestaña "Productos"
            } else if (route.name === 'Mi Perfil') {
              iconName = 'person'; // Ícono para la pestaña "Mi Perfil"
            }

            // Devolver el componente de Ionicons con el nombre del ícono adecuado
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',  // Color de los íconos cuando la pestaña está activa
          tabBarInactiveTintColor: 'gray', // Color de los íconos cuando la pestaña está inactiva
          tabBarStyle: [{ display: 'flex' }],
          headerTitle: 'UBISHOP',  // Título del encabezado
          headerStyle: {
            backgroundColor: '#2C64F1',  // Fondo azul del encabezado
            height: 80,
          },
          headerTintColor: '#fff',  // Texto en blanco
          headerTitleAlign: 'center', // Alinea el título al centro
          headerTitleStyle: {
            fontFamily: 'inter',
            fontWeight: 'bold',  // Negrita para el texto "UBISHOP"
            fontSize: 35,        // Puedes ajustar el tamaño de la fuente
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Productos" component={ProductsScreen} />
        <Tab.Screen name="Mi Perfil" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
