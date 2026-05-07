import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TasksScreen from './src/screens/TasksScreen';
import { ActivityIndicator, View } from 'react-native';

const queryClient = new QueryClient();

const RootNavigator = () => {
  const { token, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

 if (loading) {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#0F0F0F'  
    }}>
      <ActivityIndicator size="large" color="#6C63FF" />
    </View>
  );
}

  if (token) return <TasksScreen />;

  return isLogin
    ? <LoginScreen onSwitch={() => setIsLogin(false)} />
    : <SignupScreen onSwitch={() => setIsLogin(true)} />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}