import React from 'react';
import { View } from 'react-native';

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <View className="px-3">{children}</View>;
};

export default Container;
