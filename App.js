import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Importar Stack Navigator

// Importar las pantallas desde la carpeta Screens
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'; // Importar SignupScreen

// Crear Tab Navigator
const Tab = createBottomTabNavigator();

// Crear Stack Navigator para la navegación en "Mi Perfil"
const Stack = createStackNavigator();

// Definir el Stack Navigator para "Mi Perfil"
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Ocultar encabezado para LoginScreen
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ title: 'Registrarse' }} // Encabezado personalizado para SignupScreen
      />
    </Stack.Navigator>
  );
}

// Componente principal
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Productos') {
              iconName = 'pricetags';
            } else if (route.name === 'Mi Perfil') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [{ display: 'flex' }],
          headerTitle: 'UBISHOP',
          headerStyle: {
            backgroundColor: '#2C64F1',
            height: 80,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'inter',
            fontWeight: 'bold',
            fontSize: 35,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Productos" component={ProductsScreen} />
        {/* Usar ProfileStack en lugar de LoginScreen directamente */}
        <Tab.Screen name="Mi Perfil" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
