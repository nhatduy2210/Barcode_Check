import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

export const request_camera_permission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const { CKCameraManager } = NativeModules;
      return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
    }
  } catch (err) {
    return false;
  }
};
