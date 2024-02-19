import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainScreenStacks = {
  Home: undefined;
};

export type AuthScreenStacks = {
  Login: undefined;
};

export type ApplicationStacks = {
  Startup: undefined;
  Scanner: undefined;
  BarcodeDetail: { barcode: string };
  Main: NavigatorScreenParams<MainScreenStacks>;
  Auth: NavigatorScreenParams<AuthScreenStacks>;
  ScreenFormSend:  NavigatorScreenParams<AuthScreenStacks>;
};

export type ApplicationScreenProps = StackScreenProps<ApplicationStacks>;
export type AuthScreenProps = StackScreenProps<AuthScreenStacks>;
export type MainScreenProps = StackScreenProps<MainScreenStacks>;
