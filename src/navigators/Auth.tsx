import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenLogin from '@/screens/auth/ScreenLogin';
import { AuthScreenStacks } from '@/types/navigation';

const Stack = createStackNavigator<AuthScreenStacks>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={ScreenLogin} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
