import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Lógica de registro
    console.log('Registrarse', { email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {/* Campo de email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="gray"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Campo de repetir contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Repita contraseña"
        placeholderTextColor="gray"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Botón de registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 38,
    fontFamily: 'inter',
    fontWeight: 'bold',
    marginBottom: 75,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2C64F1', // Color azul del botón
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
