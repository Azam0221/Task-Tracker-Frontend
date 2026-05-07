import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { signupApi } from '../api/auth';

export default function SignupScreen({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const data = await signupApi(name, email, password);
      await login(data.token);
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account </Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Sign Up</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.switchText}>Already have an account? <Text style={styles.link}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#999', marginBottom: 32 },
  input: {
    backgroundColor: '#1E1E1E', color: '#fff', padding: 14,
    borderRadius: 10, marginBottom: 16, fontSize: 15,
    borderWidth: 1, borderColor: '#2E2E2E'
  },
  button: {
    backgroundColor: '#6C63FF', padding: 15,
    borderRadius: 10, alignItems: 'center', marginBottom: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  switchText: { color: '#999', textAlign: 'center' },
  link: { color: '#6C63FF', fontWeight: 'bold' }
});