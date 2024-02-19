import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import Container from '@/components/Container';
import KeyboardWrapper from '@/components/KeyboardWrapper';
import { RootNavigation } from '@/navigators/RootNavigation';

const ScreenLogin = () => {
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });

  const handleLogin = () => {
    RootNavigation.reset('Main', {});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardWrapper>
        <ScrollView>
          <Container>
            <Text className="text-2xl font-bold my-6 text-center">Login</Text>
            <TextInput
              label="Email"
              mode="outlined"
              className="mb-4 bg-white"
              value={email.value}
              error={email.error}
              onChangeText={(text: string) =>
                setEmail({ ...email, value: text, error: false })
              }
            />
            <TextInput
              label="Password"
              mode="outlined"
              className="mb-4 bg-white"
              value={password.value}
              error={password.error}
              secureTextEntry={true}
              onChangeText={(text: string) =>
                setPassword({ ...password, value: text, error: false })
              }
            />
            <View className="my-2">
              <Button
                loading={false}
                mode="contained"
                className="rounded-full"
                onPress={handleLogin}
              >
                <Text className="text-white">Login</Text>
              </Button>
            </View>
          </Container>
        </ScrollView>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default ScreenLogin;
