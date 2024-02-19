import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { openSettings } from 'react-native-permissions';
import { RootNavigation } from '@/navigators/RootNavigation';
import { request_camera_permission } from '@/utils/permission';
import Container from '@/components/Container';

const ScreenScanner = () => {
  const [isPermitted, setIsPermitted] = useState(false);
  const [torch, setTorch] = useState<boolean>(false);

  const initCamera = async () => {
    const permitted = await request_camera_permission();
    permitted && setIsPermitted(true);
  };

  const handleReadCode = async (event: any) => {
    RootNavigation.reset('BarcodeDetail', {
      barcode: event.nativeEvent.codeStringValue,
    });
  };

  useEffect(() => {
    initCamera();
  }, []);


  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {!isPermitted && (
        <Container>
          <View className="h-full">
            <ScrollView>
              <Text className="text-2xl font-bold text-center">
                Cannot access camera
              </Text>
              <TouchableOpacity onPress={() => openSettings()}>
                <Text className="text-xl underline text-primary text-center my-6">
                  Go to setting
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Container>
      )}
      {isPermitted && (
        <View className="h-full justify-center items-center">
          <View>
            <TouchableOpacity onPress={() => RootNavigation.goBack()}>
              <Text className="text-xl underline text-primary text-center mb-2">
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openSettings()}>
              <Text className="text-xl underline text-primary text-center mb-6">
                Privacy setting
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-80 w-80 bg-gray-500 rounded-lg overflow-hidden mb-10">
            <Camera
              className="flex-1"
              flashMode="on"
              scanBarcode={true}
              cameraType={CameraType.Back}
              onReadCode={handleReadCode}
              torchMode={torch ? 'on' : 'off'}
            />
          </View>
          <TouchableOpacity
            className="border-2 rounded-full p-3 border-white"
            onPress={() => {
              setTorch(!torch);
              ReactNativeHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
              });
            }}
          >
            <Text>Turn flash {torch ? 'off' : 'on'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScreenScanner;
