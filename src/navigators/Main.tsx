import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenHome from '@/screens/main/ScreenHome';
import { MainScreenStacks } from '@/types/navigation';

const Stack = createBottomTabNavigator<MainScreenStacks>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ScreenHome} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
