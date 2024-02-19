import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './Auth';
import MainNavigator from './Main';
import { rootNavigationRef } from '@/navigators/RootNavigation';
import ScreenBarcodeDetail from '@/screens/main/ScreenBarcodeDetail';
import ScreenScanner from '@/screens/main/ScreenScanner';
import ScreenStartup from '@/screens/ScreenStartup';
import ScreenFormSend from '@/screens/main/ScreenFormSend';
import { ApplicationStacks } from '@/types/navigation';

const Stack = createStackNavigator<ApplicationStacks>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={rootNavigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={ScreenStartup} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Scanner" component={ScreenScanner} />
        <Stack.Screen name="BarcodeDetail" component={ScreenBarcodeDetail} />
        <Stack.Screen name="ScreenFormSend" component={ScreenFormSend} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
