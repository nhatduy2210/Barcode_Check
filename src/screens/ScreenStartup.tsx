import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthState } from '@/models';
import { RootNavigation } from '@/navigators/RootNavigation';
import { getAuthState } from '@/store/auth';
import { ActivityIndicator } from 'react-native-paper';

const ScreenStartup = () => {
  const authState = useSelector((state: { auth: AuthState }) =>
    getAuthState(state),
  );

  const authVerify = async () => {
    if (!authState.isAuth) {
      return RootNavigation.reset('Auth', {});
    }
    return RootNavigation.reset('Main', {});
  };

  useEffect(() => {
    setTimeout(() => {
      authVerify();
    }, 3000);
  });

  return (
    <View className="bg-white h-screen w-screen">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

export default ScreenStartup;
